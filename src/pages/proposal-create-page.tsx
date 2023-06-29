import { redirect, useParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import type { ProposalAction, ProposalFormValues } from 'types'
import { logError, throwError } from 'util/errors'
import {
  defaultDecisionPolicyFormValues,
  defaultDelegateFormValues,
  defaultSendFormValues,
} from 'util/form.defaults'
import { uuid } from 'util/helpers'
import { getGroupPolicyValues, getGroupValues } from 'util/initialValues'
import { getPolicyAsGroupAdmin, getPolicyAsPolicyAdmin } from 'util/policyAdmin'

import { createProposal } from 'api/proposal.actions'
import { useAppLocation } from 'hooks/react-router'
import {
  useBalances,
  useGroup,
  useGroupMembers,
  useGroupPolicies,
  useGroupProposals,
} from 'hooks/use-query'
import { useTxToasts } from 'hooks/use-toasts'
import { Chain } from 'store/chain.store'
import { Wallet } from 'store/wallet.store'

import { Loading } from '@/molecules/loading'
import { DecisionPolicyFormValues } from '@/organisms/update-group-decision-policy-form'
import { MembersFormValues } from '@/organisms/update-group-members-form'
import { ProposalCRUDTemplate } from '@/templates/proposal-crud-template'

const steps = ['Propose Action', 'Review Proposal', 'Proposal Open']

export default function ProposalCreate() {
  const { groupId } = useParams()
  const { state } = useAppLocation()
  const { toastSuccess, toastErr } = useTxToasts()
  const { stakeDenom } = useSnapshot(Chain)
  const { account } = useSnapshot(Wallet)
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)
  const { data: members } = useGroupMembers(groupId)
  const { data: groupPolicies } = useGroupPolicies(groupId)
  const { data: proposals, isLoading: isLoadingProposals } = useGroupProposals(groupId)
  const groupPolicy = groupPolicies?.[0]
  const { data: policyBalances } = useBalances(groupPolicy?.address)

  if (isLoadingGroup || isLoadingProposals) return <Loading />
  if (!group || !groupPolicy) {
    redirect('/')
    return null
  }

  const policyAsGroupAdmin = getPolicyAsGroupAdmin(group, groupPolicy)
  const policyAsPolicyAdmin = getPolicyAsPolicyAdmin(groupPolicy)
  const initialGroupValues = getGroupValues(group, members, policyAsGroupAdmin)
  const initialPolicyValues = getGroupPolicyValues(groupPolicy?.decisionPolicy)
  const updateGroupFormValues = policyAsPolicyAdmin
    ? ({
        ...initialPolicyValues,
        updateGroupType: 'decision-policy',
      } as DecisionPolicyFormValues)
    : policyAsGroupAdmin
    ? ({
        members: initialGroupValues.members,
        updateGroupType: 'members',
      } as MembersFormValues)
    : undefined

  function getInitialFormActions(): ProposalAction[] | null {
    const id = uuid()
    switch (state?.newProposalType) {
      case 'send':
        return [{ id, type: 'send', values: defaultSendFormValues }]
      case 'stake':
        return [{ id, type: 'stake', values: defaultDelegateFormValues }]
      case 'update-group':
        return (
          state?.newUpdateGroupProposalValues?.map((values) => ({
            id,
            type: 'update-group',
            values,
          })) ?? [
            {
              id,
              type: 'update-group',
              values: updateGroupFormValues || defaultDecisionPolicyFormValues,
            },
          ]
        )
      default:
      case 'text':
        return null
    }
  }

  async function handleSubmit({
    actions,
    title,
    summary,
  }: ProposalFormValues): Promise<string | null> {
    if (!groupPolicy || !group) {
      return null
    }
    try {
      if (!account?.address) {
        throwError('Error submitting proposal: No group policy found')
      }
      // TODO: should this be a react-query mutation?
      const data = await createProposal({
        actions,
        title,
        summary,
        denom: stakeDenom,
        groupPolicyAddress: groupPolicy.address,
        metadata: { title, summary },
        proposers: [account.address],
        groupId: group.id.toString(),
      })
      if (!data?.proposalId)
        throwError('Proposal transaction completed, but no proposal ID found')
      toastSuccess(data.transactionHash)
      return data.proposalId
    } catch (error) {
      console.log(error)
      logError(error)
      toastErr(error, 'Proposal could not be created:')
      return null
    }
  }

  return (
    <ProposalCRUDTemplate
      policyBalances={policyBalances || []}
      groupId={group.id.toString()}
      groupName={group.metadata.name}
      groupPolicyAddress={groupPolicy.address}
      initialProposalFormValues={{
        actions: getInitialFormActions() ?? [],
        title: `Proposal ${proposals ? proposals.length + 1 : 'Title'}`,
        summary: 'Add a description or a text proposal here',
      }}
      steps={steps}
      submit={handleSubmit}
      policyAsGroupAdmin={policyAsGroupAdmin}
      policyAsPolicyAdmin={policyAsPolicyAdmin}
      updateGroupFormValues={updateGroupFormValues}
      initialPolicyValues={initialPolicyValues}
      initialGroupValues={initialGroupValues}
    />
  )
}
