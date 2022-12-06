import { useQuery } from '@tanstack/react-query'

import { Chain } from 'store'
import {
  fetchGroupById,
  fetchGroupsWithMembersByAdmin,
  fetchGroupsWithMembersByMember,
} from 'api/group.actions'
import { fetchGroupMembers } from 'api/member.actions'
import { fetchGroupPolicies } from 'api/policy.actions'
import { fetchValidators } from 'api/staking.actions'

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
