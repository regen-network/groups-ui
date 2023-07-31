import { redirect, useParams } from 'react-router-dom'

import type { GroupWithPolicyFormValues, MemberFormValues } from 'types'
import { logError, throwError } from 'util/errors'
import { clearEmptyStr } from 'util/helpers'
import { getGroupPolicyValues, getGroupValues } from 'util/initialValues'
import { getPolicyAsGroupAdmin, getPolicyAsPolicyAdmin } from 'util/policyAdmin'

import { msgUpdateGroupMetadata } from 'api/group.messages'
import { msgUpdateGroupMembers } from 'api/member.messages'
import { msgCreateGroupPolicy, msgUpdateDecisionPolicy } from 'api/policy.messages'
import { useGroup, useGroupMembers, useGroupPolicies } from 'hooks/use-query'
import { useTxToasts } from 'hooks/use-toasts'
import { signAndBroadcast, Wallet } from 'store/wallet.store'

import { Loading } from '@/molecules/loading'
import { GroupCRUDTemplate } from '@/templates/group-crud-template'

export default function GroupEdit() {
  const { toastErr, toastSuccess } = useTxToasts()
  const { groupId } = useParams()
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)
  const { data: members, isLoading: isLoadingMembers } = useGroupMembers(groupId)
  const { data: policies, isLoading: isLoadingPolicies } = useGroupPolicies(groupId)

  const policy = policies?.[0]
  if (isLoadingGroup || isLoadingMembers || isLoadingPolicies) return <Loading />
  if (!group || !groupId) {
    logError('Missing group or group ID, redirecting')
    redirect('/')
    return null
  }

  const policyAsGroupAdmin = getPolicyAsGroupAdmin(group, policy)
  const policyAsPolicyAdmin = getPolicyAsPolicyAdmin(policy)
  const initialGroupValues = getGroupValues(group, members, policyAsGroupAdmin)
  const initialPolicyValues = getGroupPolicyValues(policy?.decisionPolicy)

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
              },
            }),
          )
        }
        if (prop === 'admin') {
          // disabled for now
          // TODO(#115): check if current admin, block in UI otherwise? maybe give disclosure
          // msg/updateGroupAdmin
        }
        if (prop === 'members') {
          msgs.push(
            msgUpdateGroupMembers({
              groupId,
              admin: group.admin,
              members: values.members as MemberFormValues[],
            }),
          )
        }
        if (prop === 'votingWindow' || prop === 'threshold' || prop === 'percentage') {
          if (policy)
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
          else if (Wallet.account?.address)
            msgs.push(
              msgCreateGroupPolicy({
                groupId,
                admin: Wallet.account?.address,
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
        submitBtn: policyAsPolicyAdmin ? 'Create Proposal' : 'Redeploy',
        finished: 'You have successfully edited your group.',
      }}
      steps={[
        'Edit Group',
        `${policy ? 'Edit' : 'Create'} Group Policy`,
        'Finished editing',
      ]}
      submit={handleSave}
      policyAsGroupAdmin={policyAsGroupAdmin}
      policyAsPolicyAdmin={policyAsPolicyAdmin}
    />
  )
}
