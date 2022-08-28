import { useQuery } from '@tanstack/react-query'

import { fetchGroupsByAdmin, fetchGroupsByMember } from 'store/Group'
import { Wallet } from 'store/Wallet'

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
