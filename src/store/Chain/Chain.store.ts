import { StdFee } from '@cosmjs/stargate'
import type { ChainInfo } from '@keplr-wallet/types'
import { proxy } from 'valtio'

import { allChainsArray } from 'chains'

import { LOCALSTORAGE_CHAIN_KEY } from './Chain.constants'

const savedChain = localStorage.getItem(LOCALSTORAGE_CHAIN_KEY)

type ChainStore = {
  active: ChainInfo
  all: ChainInfo[]
  fee?: StdFee | 'auto' | number
}

export const Chain = proxy<ChainStore>({
  active: savedChain ? JSON.parse(savedChain) : allChainsArray[0],
  all: allChainsArray,
})
