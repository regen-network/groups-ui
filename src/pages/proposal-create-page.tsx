import { redirect, useParams } from 'react-router-dom'
import { useSnapshot } from 'valtio'

import type { ProposalAction, ProposalFormValues } from 'types'
import { handleError, throwError } from 'util/errors'
import { defaultDelegateFormValues } from 'util/form.defaults'
import { getFeeDenom, uuid } from 'util/helpers'

import { createProposal } from 'api/proposal.actions'
import { useAppLocation } from 'hooks/react-router'
import { useGroup, useGroupPolicies, useGroupProposals } from 'hooks/use-query'
import { useTxToasts } from 'hooks/use-toasts'
import { Chain } from 'store/chain.store'
import { Wallet } from 'store/wallet.store'

import { Loading } from '@/molecules/loading'
import { ProposalCRUDTemplate } from '@/templates/proposal-crud-template'

const steps = ['Propose Action', 'Review Proposal', 'Proposal Open']

export default function ProposalCreate() {
  const { groupId } = useParams()
  const { state } = useAppLocation()
  const { toastSuccess, toastErr } = useTxToasts()
  const { fee } = useSnapshot(Chain)
  const { account } = useSnapshot(Wallet)
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)
  const { data: groupPolicies } = useGroupPolicies(groupId)
  const { data: proposals, isLoading: isLoadingProposals } = useGroupProposals(groupId)
  const [groupPolicy] = groupPolicies || []

  if (isLoadingGroup || isLoadingProposals) return <Loading />
  if (!group || !groupPolicy) {
    redirect('/')
    return null
  }

  function getInitialFormAction(): ProposalAction | null {
    const id = uuid()
    switch (state?.newProposalType) {
      case 'stake':
        return { id, type: 'stake', values: defaultDelegateFormValues }
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
    try {
      if (!fee || !account?.address) {
        throwError('Error submitting proposal:  No fee or group policy found')
      }
      // TODO: should this be a react-query mutation?
      const data = await createProposal({
        actions,
        title,
        summary,
        denom: getFeeDenom(fee),
        groupPolicyAddress: groupPolicy.address,
        metadata: { title, summary },
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

  const initialAction = getInitialFormAction()

  return (
    <ProposalCRUDTemplate
      initialProposalFormValues={{
        actions: initialAction ? [initialAction] : [],
        title: `Proposal ${proposals ? proposals.length + 1 : 'Title'}`,
        summary: 'Add a description or a text proposal here',
      }}
      groupName={group.metadata.name}
      groupId={group.id.toString()}
      submit={handleSubmit}
      steps={steps}
    />
  )
}
