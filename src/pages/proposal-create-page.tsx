import { redirect, useParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import { handleError, throwError } from 'util/errors'
import { defaultDelegateFormValues } from 'util/form.constants'
import { getFeeDenom, uuid } from 'util/helpers'

import { createProposal } from 'api/proposal.actions'
import { useGroup, useGroupPolicies } from 'hooks/use-query'
import { useTxToasts } from 'hooks/useToasts'
import { Chain } from 'store/chain.store'
import { Wallet } from 'store/wallet.store'

import { Loading } from '@/molecules/loading'
import { type ProposalFormValues } from '@/organisms/proposal-form'
import { ProposalTemplate } from '@/templates/proposal-template'

const steps = ['Propose Action', 'Review Proposal', 'Proposal Open']

export default function ProposalCreate() {
  const { toastSuccess, toastErr } = useTxToasts()
  const { groupId } = useParams()
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)
  const { data: groupPolicies, isLoading: isLoadingPolicy } = useGroupPolicies(groupId)
  const { fee } = useSnapshot(Chain)
  const { account } = useSnapshot(Wallet)
  const [groupPolicy] = groupPolicies || []

  if (isLoadingGroup || isLoadingPolicy) return <Loading />
  if (!group || !groupPolicy) {
    redirect('/')
    return null
  }

  async function handleSubmit({
    actions,
    title,
    description,
  }: ProposalFormValues): Promise<string | null> {
    try {
      if (!fee || !groupPolicies?.[0] || !account?.address) {
        throwError('Error submitting proposal:  No fee or group policy found')
      }
      const data = await createProposal({
        actions,
        denom: getFeeDenom(fee),
        groupPolicyAddress: groupPolicy.address,
        metadata: { title, description },
        proposers: [account.address],
      })
      if (!data?.proposalId)
        throwError('Proposal transaction completed, but no proposal ID found')
      toastSuccess(data.transactionHash, 'Proposal created!')
      return data.proposalId
    } catch (error) {
      handleError(error)
      toastErr(error, 'Proposal could not be created:')
      return null
    }
  }

  return (
    <ProposalTemplate
      initialProposalFormValues={{
        actions: [{ id: uuid(), type: 'stake', values: defaultDelegateFormValues }],
        // TODO: set initial title / description based on the number of
        // previous proposals?
        title: 'Proposal Title',
        description: 'Proposal Description',
      }}
      groupName={group.metadata.name}
      groupId={group.id.toString()}
      submit={handleSubmit}
      steps={steps}
    />
  )
}
