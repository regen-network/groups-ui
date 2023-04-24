import { useParams } from 'react-router-dom'

import type {
  GroupFormValues,
  GroupPolicyFormValues,
  GroupWithPolicyFormValues,
} from 'types'
import { logError, throwError } from 'util/errors'
import { DEFAULT_MEMBER_WEIGHT, DEFAULT_VOTING_WINDOW } from 'util/form.defaults'
import { clearEmptyStr, percentStrToNum } from 'util/helpers'

import { msgUpdateGroupMetadata } from 'api/group.messages'
import { msgUpdateGroupMembers } from 'api/member.messages'
import { msgUpdateDecisionPolicy } from 'api/policy.messages'
import { isPercentagePolicy, isThresholdPolicy } from 'api/policy.utils'
import { useGroup, useGroupMembers, useGroupPolicies } from 'hooks/use-query'
import { useTxToasts } from 'hooks/use-toasts'
import { signAndBroadcast } from 'store/wallet.store'

import { Loading } from '@/molecules/loading'
import { GroupCRUDTemplate } from '@/templates/group-crud-template'

export default function GroupEdit() {
  const { toastErr, toastSuccess } = useTxToasts()
  const { groupId } = useParams()
  const { data: group } = useGroup(groupId)
  const { data: members } = useGroupMembers(groupId)
  const { data: policies } = useGroupPolicies(groupId)

  const [policy] = policies ?? []

  if (!group || !members || !policy?.decisionPolicy) return <Loading />

  const { decisionPolicy } = policy

  const initialGroupValues: GroupFormValues = {
    admin: policy.admin,
    members: members.map(({ member }) => ({
      address: member?.address,
      weight: parseInt(member?.weight || DEFAULT_MEMBER_WEIGHT.toString()),
      metadata: member?.metadata,
    })),
    name: group.metadata.name,
    policyAsAdmin: policy.address === group.admin ? 'true' : 'false',
    description: group.metadata.description,
    forumLink: group.metadata.forumLink,
    otherMetadata: group.metadata.other,
  }

  const initialPolicyValues: GroupPolicyFormValues = {
    threshold: isThresholdPolicy(decisionPolicy)
      ? parseInt(decisionPolicy.threshold)
      : undefined,
    votingWindow: parseInt(
      decisionPolicy.windows?.votingPeriod || DEFAULT_VOTING_WINDOW.toString(),
    ), //parseFloat(decisionPolicy.windows.voting_period),
    percentage: isPercentagePolicy(policy.decisionPolicy)
      ? percentStrToNum(policy.decisionPolicy.percentage)
      : undefined,
    policyType: isThresholdPolicy(decisionPolicy) ? 'threshold' : 'percentage',
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
            msgUpdateGroupMetadata({
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
            msgUpdateGroupMembers({
              groupId,
              admin: group.admin,
              members: values.members,
            }),
          )
        }
        if (prop === 'votingWindow' || prop === 'threshold' || prop === 'percentage') {
          msgs.push(
            msgUpdateDecisionPolicy({
              admin: group.admin,
              policyAddress: policy.address,
              policyType: values.policyType,
              votingWindow: values.votingWindow,
              percentage: clearEmptyStr(values.percentage),
              threshold: clearEmptyStr(values.threshold),
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
      logError(err)
      toastErr(err, 'Editing group')
      return false
    }
  }

  return (
    <GroupCRUDTemplate
      disabledGroupFormFields={['admin']}
      newGroupId={groupId}
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
