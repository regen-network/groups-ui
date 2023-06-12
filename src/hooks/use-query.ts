import { useQuery } from '@tanstack/react-query'

import { fetchAllBalances } from 'api/bank.actions'
import {
  fetchGroupById,
  fetchGroupsWithMembersByAdmin,
  fetchGroupsWithMembersByMember,
} from 'api/group.actions'
import { fetchGroupMembers } from 'api/member.actions'
import { fetchGroupPolicies } from 'api/policy.actions'
import {
  fetchProposalbyId,
  fetchProposalsByGroupPolicy,
  fetchVotesByAddress,
  fetchVotesByProposal,
} from 'api/proposal.actions'
import { fetchValidators } from 'api/staking.actions'
import { Chain } from 'store/chain.store'
import { Wallet } from 'store/wallet.store'

export function useGroup(groupId?: string) {
  return useQuery({
    queryKey: ['group', groupId],
    queryFn: () => fetchGroupById(groupId),
    enabled: !!groupId,
  })
}

export function useGroupMembers(groupId?: string) {
  return useQuery({
    queryKey: ['groupMembers', groupId],
    queryFn: () => fetchGroupMembers(groupId),
    enabled: !!groupId,
  })
}

export function useMemberGroups(address?: string) {
  return useQuery({
    queryKey: ['groups', { type: 'member' }],
    queryFn: () => fetchGroupsWithMembersByMember(address),
    enabled: !!address,
  })
}

export function useAdminGroups(address?: string) {
  return useQuery({
    queryKey: ['groups', { type: 'admin' }],
    queryFn: () => fetchGroupsWithMembersByAdmin(address),
    enabled: !!address,
  })
}

export function useGroupPolicies(groupId?: string) {
  return useQuery({
    queryKey: ['groupPolicies', groupId],
    queryFn: () => fetchGroupPolicies(groupId),
    enabled: !!groupId,
  })
}

export function useValidators() {
  const { chainId } = Chain.active
  return useQuery({
    queryKey: ['validators', chainId],
    queryFn: () => fetchValidators(),
    enabled: !!chainId,
  })
}

export function useProposal(proposalId?: string) {
  return useQuery({
    queryKey: ['proposal', proposalId],
    queryFn: () => fetchProposalbyId(proposalId),
    enabled: !!proposalId,
  })
}

export function useGroupProposals(groupId?: string) {
  const { data: policies, isLoading } = useGroupPolicies(groupId)
  const policyIds = policies?.map((p) => p.address) || []
  return useQuery({
    queryKey: ['proposals', groupId],
    queryFn: async () => {
      const proposals = await Promise.all(
        policyIds.map(async (address) => await fetchProposalsByGroupPolicy(address)),
      )
      return proposals.flat()
    },
    enabled: !isLoading,
  })
}

export function useBalances(address?: string) {
  return useQuery({
    queryKey: ['balances', address],
    queryFn: () => fetchAllBalances(address),
    enabled: !!address,
  })
}

export function useProposalVotes(proposalId?: string) {
  return useQuery({
    queryKey: ['proposalVotes', proposalId],
    queryFn: () => fetchVotesByProposal(proposalId),
    enabled: !!proposalId,
  })
}

export function useUserVotes() {
  const userAddress = Wallet.account?.address
  return useQuery({
    queryKey: ['addressVotes', userAddress],
    queryFn: () => fetchVotesByAddress(userAddress),
    enabled: !!userAddress,
  })
}
