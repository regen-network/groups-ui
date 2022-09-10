import { useQuery } from '@tanstack/react-query'

import {
  fetchGroupById,
  fetchGroupMembers,
  fetchGroupPolicies,
  fetchGroupsWithMembersByAdmin,
  fetchGroupsWithMembersByMember,
} from 'store/group'

export function useGroup(groupId?: string) {
  return useQuery(
    ['group', groupId],
    () => {
      return fetchGroupById(groupId)
    },
    { enabled: !!groupId },
  )
}

export function useGroupMembers(groupId?: string) {
  return useQuery(
    ['groupMembers', groupId],
    () => {
      return fetchGroupMembers(groupId)
    },
    {
      enabled: !!groupId,
    },
  )
}

export function useMemberGroups(address?: string) {
  return useQuery(
    ['groups', { type: 'member' }],
    () => {
      return fetchGroupsWithMembersByMember(address)
    },
    { enabled: !!address },
  )
}

export function useAdminGroups(address?: string) {
  return useQuery(
    ['groups', { type: 'admin' }],
    () => {
      return fetchGroupsWithMembersByAdmin(address)
    },
    { enabled: !!address },
  )
}

export function useGroupPolicies(groupId?: string) {
  return useQuery(
    ['groupPolicies', groupId],
    () => {
      return fetchGroupPolicies(groupId)
    },
    { enabled: !!groupId },
  )
}
