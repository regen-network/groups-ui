import { proxy } from 'valtio'

import type { BankQueryClient, GroupQueryClient, StakingQueryClient } from 'types'

type QueryStore = {
  groups?: GroupQueryClient
  staking?: StakingQueryClient
  bank?: BankQueryClient
}

/** proxy for instances to various query clients, which change depending on
 * selected chain */
export const Query = proxy<QueryStore>({})
