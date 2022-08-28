import { useQuery } from '@tanstack/react-query'

import {
  fetchGroupsWithMembersByAdmin,
  fetchGroupsWithMembersByMember,
} from 'store/Group'
import { Wallet } from 'store/Wallet'

export function useMemberGroups() {
  return useQuery(['groups', { type: 'member' }], () => {
    return fetchGroupsWithMembersByMember(Wallet.account?.address)
  })
}

export function useAdminGroups() {
  return useQuery(['groups', { type: 'admin' }], () => {
    return fetchGroupsWithMembersByAdmin(Wallet.account?.address)
  })
}
