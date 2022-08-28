import { useQuery } from '@tanstack/react-query'

import { fetchGroupsByAdmin, fetchGroupsByMember, Wallet } from 'store'

export const useMemberGroups = () => {
  useQuery(['groups', { type: 'member' }], () => {
    return fetchGroupsByMember(Wallet.account?.address)
  })
}

export const useAdminGroups = () => {
  useQuery(['groups', { type: 'admin' }], () => {
    return fetchGroupsByAdmin(Wallet.account?.address)
  })
}
