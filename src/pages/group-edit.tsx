import { useParams } from 'react-router-dom'

import { GroupWithPolicyFormValues } from 'models'
import { TOAST_DEFAULTS } from 'util/constants'
import { toErrorWithMessage } from 'util/errors'

import { createGroupWithPolicy } from 'api/group.actions'
import { useToast } from 'hooks/chakra'
import { useGroup, useGroupMembers, useGroupPolicies } from 'hooks/use-query'

import { Loading } from '@/molecules'
import GroupTemplate from '@/templates/group-template'

export default function GroupEdit() {
  const toast = useToast()
  const { groupId } = useParams()
  const { data: group } = useGroup(groupId)
  const { data: members } = useGroupMembers(groupId)
  const { data: policies } = useGroupPolicies(groupId)

  const [policy] = policies?.group_policies ?? []

  async function handleSave(values: GroupWithPolicyFormValues) {
    try {
      const { transactionHash } = await createGroupWithPolicy(values)
      const time = 3000
      toast({
        ...TOAST_DEFAULTS,
        title: 'Group created',
        description: 'Transaction hash: ' + transactionHash,
        status: 'success',
        duration: time,
      })
    } catch (err) {
      reportError(err)
      const msg = toErrorWithMessage(err).message
      toast({
        ...TOAST_DEFAULTS,
        title: 'Group creation failed',
        description: msg,
        status: 'error',
        duration: 9000,
      })
    }
  }

  if (!group || !members || !policy) return <Loading />

  return (
    <GroupTemplate
      defaultFormValues={{
        admin: policy.admin,
        members: members.map(({ member }) => ({
          address: member.address,
          weight: +member.weight,
          metadata: member.metadata,
        })),
        name: group.metadata.name,
        policyAsAdmin: policy.address === group.admin ? 'true' : 'false',
        threshold: 51, // TODO decision_policy not typed correctly
        votingWindow: 2, // TODO
        description: group.metadata.description,
        forumLink: group.metadata.forumLink,
        otherMetadata: group.metadata.other,
        // quorum: // TODO
      }}
      text={{
        submitBtn: 'Redeploy',
        finished: 'You have successfully edited your group.',
      }}
      steps={['Edit Group', 'Edit Group Policy', 'Finished editing']}
      submit={handleSave}
    />
  )
}
