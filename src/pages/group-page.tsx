import { redirect, useParams } from 'react-router-dom'

import { handleError } from 'util/errors'

import { useDerivedProposals } from 'hooks/use-derived-proposals'
import {
  useBalances,
  useGroup,
  useGroupPolicies,
  useGroupProposals,
} from 'hooks/use-query'

import { Loading } from '@/molecules/loading'
import { GroupTemplate } from '@/templates/group-template'

export default function GroupPage() {
  const { groupId } = useParams()
  const { data: group, isLoading: isLoadingGroup } = useGroup(groupId)
  const { data: policies } = useGroupPolicies(groupId)
  const { data: proposals, isLoading: isLoadingProposals } = useGroupProposals(groupId)

  const groupPolicy = policies?.[0]
  const { data: balances } = useBalances(groupPolicy?.address)
  const derivedProposals = useDerivedProposals(proposals)

  if (isLoadingGroup || isLoadingProposals) return <Loading />
  if (!group) {
    handleError('Group not found')
    redirect('/')
    return null
  }

  return (
    <GroupTemplate
      group={group}
      policies={policies}
      balances={balances}
      onExecute={(p) => console.log('execute proposal', p)}
      proposals={{
        accepted: derivedProposals.accepted,
        history: derivedProposals.other,
        submitted: derivedProposals.submitted,
      }}
    />
  )
}
