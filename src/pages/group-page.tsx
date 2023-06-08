import { redirect, useParams } from 'react-router-dom'

import { UIProposal } from 'types'
import { logError } from 'util/errors'

import { executeProposal } from 'api/proposal.actions'
import { useDerivedProposals } from 'hooks/use-derived-proposals'
import {
  useBalances,
  useGroup,
  useGroupPolicies,
  useGroupProposals,
} from 'hooks/use-query'
import { useTxToasts } from 'hooks/use-toasts'

import { Loading } from '@/molecules/loading'
import { GroupTemplate } from '@/templates/group-template'

export default function GroupPage() {
  const { groupId } = useParams()
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)
  const { data: policies, isLoading: isLoadingPolicies } = useGroupPolicies(groupId)
  const { data: proposals, isLoading: isLoadingProposals } = useGroupProposals(groupId)
  const { toastSuccess, toastErr } = useTxToasts()

  const groupPolicy = policies?.[0]
  // See https://github.com/TanStack/query/issues/3584 why we use isInitialLoading
  const { data: balances, isInitialLoading: isLoadingBalances } = useBalances(
    groupPolicy?.address,
  )
  const derivedProposals = useDerivedProposals(proposals)

  if (isLoadingGroup || isLoadingPolicies || isLoadingProposals || isLoadingBalances) {
    return <Loading />
  }

  if (!group) {
    logError('Group not found')
    redirect('/')
    return null
  }

  const handleExecute = async (proposal: UIProposal) => {
    try {
      const { transactionHash } = await executeProposal({ proposalId: proposal.id })
      toastSuccess(transactionHash)
    } catch (err) {
      toastErr(err)
    }
  }

  return (
    <GroupTemplate
      group={group}
      policies={policies}
      balances={balances}
      onExecute={handleExecute}
      proposals={{
        accepted: derivedProposals.accepted,
        history: derivedProposals.other,
        submitted: derivedProposals.submitted,
      }}
    />
  )
}
