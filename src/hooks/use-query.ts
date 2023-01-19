import { useQuery } from '@tanstack/react-query'

import { fetchAllBalances } from 'api/bank.actions'
import {
  fetchGroupById,
  fetchGroupsWithMembersByAdmin,
  fetchGroupsWithMembersByMember,
} from 'api/group.actions'
import { fetchGroupMembers } from 'api/member.actions'
import { fetchGroupPolicies, fetchGroupPoliciesWithProposals } from 'api/policy.actions'
import { fetchProposalbyId } from 'api/proposal.actions'
import { fetchValidators } from 'api/staking.actions'
import { Chain } from 'store/chain.store'

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

export function useGroupPoliciesWithProposals(groupId?: string) {
  return useQuery({
    queryKey: ['groupPoliciesWithProposals', groupId],
    queryFn: () => fetchGroupPoliciesWithProposals(groupId),
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

export function useBalances(address?: string) {
  console.log('address :>> ', address)
  return useQuery({
    queryKey: ['balances', address],
    queryFn: () => fetchAllBalances(address),
    enabled: !!address,
  })
}
