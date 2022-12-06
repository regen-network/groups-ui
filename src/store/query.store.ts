import { proxy } from 'valtio'

import type { GroupQueryClient, StakingQueryClient } from 'types'

type QueryStore = {
  groups?: GroupQueryClient
  staking?: StakingQueryClient
}

/** proxy for instances to various query clients, which change depending on
 * selected chain */
export const Query = proxy<QueryStore>({})
