import { useParams } from 'react-router-dom'

import type {
  GroupFormValues,
  GroupPolicyFormValues,
  GroupWithPolicyFormValues,
} from 'types'
import { handleError, throwError } from 'util/errors'
import { percentToInt } from 'util/helpers'

import { signAndBroadcast } from 'store'
import { updateGroupMetadataMsg } from 'api/group.messages'
import { updateGroupMembersMsg } from 'api/member.messages'
import { isPercentagePolicy, isThresholdPolicy } from 'api/policy.helpers'
import { updateDecisionPolicyMsg } from 'api/policy.messages'
import { useGroup, useGroupMembers, useGroupPolicies } from 'hooks/use-query'
import { useTxToasts } from 'hooks/useToasts'

import { Loading } from '@/molecules'
import GroupTemplate from '@/templates/group-template'

export default function GroupEdit() {
  const { toastErr, toastSuccess } = useTxToasts()
  const { groupId } = useParams()
  const { data: group } = useGroup(groupId)
  const { data: members } = useGroupMembers(groupId)
  const { data: policies } = useGroupPolicies(groupId)

  const [policy] = policies ?? []

  if (!group || !members || !policy?.decision_policy) return <Loading />

  const { decision_policy } = policy

  const initialGroupValues: GroupFormValues = {
    admin: policy.admin,
    members: members.map(({ member }) => ({
      address: member.address,
      weight: parseInt(member.weight),
      metadata: member.metadata,
    })),
    name: group.metadata.name,
    policyAsAdmin: policy.address === group.admin ? 'true' : 'false',
    description: group.metadata.description,
    forumLink: group.metadata.forumLink,
    otherMetadata: group.metadata.other,
  }

  const initialPolicyValues: GroupPolicyFormValues = {
    threshold: isThresholdPolicy(decision_policy)
      ? parseFloat(decision_policy.threshold)
      : undefined,
    votingWindow: parseFloat(decision_policy.windows.voting_period),
    quorum: isPercentagePolicy(policy.decision_policy)
      ? percentToInt(policy.decision_policy.percentage)
      : undefined,
  }

  const initialValues = {
    // combined for ease of iterating over
    ...initialGroupValues,
    ...initialPolicyValues,
  }

  async function handleSave(values: GroupWithPolicyFormValues): Promise<boolean> {
    if (!group || !group.admin || !groupId)
      throwError('Something went wrong: missing admin or groupId')
    const msgs = []
    const hasUpdatedMetadata = false
    for (const _prop in values) {
      const prop = _prop as keyof GroupWithPolicyFormValues // ts hack
      if (initialValues[prop] !== values[prop]) {
        if (
          ['name', 'description', 'forumLink', 'otherMetadata'].includes(prop) &&
          !hasUpdatedMetadata
        ) {
          // update metadata
          msgs.push(
            updateGroupMetadataMsg({
              groupId,
              admin: group.admin,
              metadata: {
                ...group.metadata,
                description: values.description,
                forumLink: values.forumLink,
                name: values.name,
                other: values.otherMetadata,
                updatedAt: Date.now().toString(),
              },
            }),
          )
        }
        if (prop === 'admin') {
          // disabled for now
          // TODO: check if current admin, block in UI otherwise? maybe give disclosure
          // msg/updateGroupAdmin
        }
        if (prop === 'members') {
          msgs.push(
            updateGroupMembersMsg({
              groupId,
              admin: group.admin,
              members: values.members,
            }),
          )
        }
        if (prop === 'votingWindow' || prop === 'threshold' || prop === 'quorum') {
          // TODO Msg/UpdateGroupPolicyDecisionPolicy
          msgs.push(
            updateDecisionPolicyMsg({
              admin: group.admin,
              policyAddress: policy.address,
              votingWindow: values.votingWindow,
              quorum: values.quorum,
              threshold: values.threshold,
            }),
          )
        }
      }
    }
    try {
      const { transactionHash } = await signAndBroadcast(msgs)
      toastSuccess(transactionHash)
      return true
    } catch (err) {
      handleError(err)
      toastErr(err, 'Editing group')
      return false
    }
  }

  return (
    <GroupTemplate
      disabledGroupFormFields={['admin']}
      linkToGroupId={groupId}
      initialGroupFormValues={initialGroupValues}
      initialPolicyFormValues={initialPolicyValues}
      text={{
        submitBtn: 'Redeploy',
        finished: 'You have successfully edited your group.',
      }}
      steps={['Edit Group', 'Edit Group Policy', 'Finished editing']}
      submit={handleSave}
    />
  )
}
