import type { ChainInfo } from '@keplr-wallet/types'
import { proxy } from 'valtio'

import { allChainsArray } from 'chains'
import { LOCALSTORAGE_CHAIN_KEY } from 'util/constants'

const savedChain = localStorage.getItem(LOCALSTORAGE_CHAIN_KEY)
const defaultChain = allChainsArray.find((c) => c.chainId === 'cosmoswithgroups')

type ChainStore = {
  active: ChainInfo
  all: ChainInfo[]
}

export const Chain = proxy<ChainStore>({
  active: savedChain ? JSON.parse(savedChain) : defaultChain,
  all: allChainsArray,
})
