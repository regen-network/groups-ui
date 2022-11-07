import { useQuery } from '@tanstack/react-query'

import {
  fetchGroupById,
  fetchGroupsWithMembersByAdmin,
  fetchGroupsWithMembersByMember,
} from 'api/group.actions'
import { fetchGroupMembers } from 'api/member.actions'
import { fetchGroupPolicies } from 'api/policy.actions'

const queryDefaults = (enabled?: string) => ({
  enabled: !!enabled,
  useErrorBoundary: true,
})

export function useGroup(groupId?: string) {
  return useQuery(
    ['group', groupId],
    () => {
      return fetchGroupById(groupId)
    },
    { ...queryDefaults(groupId) },
  )
}

export function useGroupMembers(groupId?: string) {
  return useQuery(
    ['groupMembers', groupId],
    () => {
      return fetchGroupMembers(groupId)
    },
    { ...queryDefaults(groupId) },
  )
}

export function useMemberGroups(address?: string) {
  return useQuery(
    ['groups', { type: 'member' }],
    () => {
      return fetchGroupsWithMembersByMember(address)
    },
    { ...queryDefaults(address) },
  )
}

export function useAdminGroups(address?: string) {
  return useQuery(
    ['groups', { type: 'admin' }],
    () => {
      return fetchGroupsWithMembersByAdmin(address)
    },
    { ...queryDefaults(address) },
  )
}

export function useGroupPolicies(groupId?: string) {
  return useQuery(
    ['groupPolicies', groupId],
    () => {
      return fetchGroupPolicies(groupId)
    },
    { ...queryDefaults(groupId) },
  )
}
