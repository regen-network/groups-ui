import type { StdFee } from '@cosmjs/stargate'
import type { ChainInfo } from '@keplr-wallet/types'
import { proxy } from 'valtio'

import type { ValidatorSDKType } from 'types'

import { allChainsArray } from 'api/chains'

import { bootstrapKeplr } from './wallet.store'

export const LOCALSTORAGE_CHAIN_KEY = 'active-chain'

const savedChain = localStorage.getItem(LOCALSTORAGE_CHAIN_KEY)
const defaultChain = allChainsArray[0]

type ChainStore = {
  active: ChainInfo
  all: ChainInfo[]
  fee?: StdFee // | 'auto' | number
  validators: ValidatorSDKType[]
}

export const Chain = proxy<ChainStore>({
  active: savedChain ? JSON.parse(savedChain) : defaultChain,
  all: allChainsArray,
  validators: [],
})

export function setActiveChain(chainId: string) {
  const newChain = Chain.all.find((chain) => chain.chainId === chainId)
  if (newChain) {
    Chain.active = newChain
    localStorage.setItem(LOCALSTORAGE_CHAIN_KEY, JSON.stringify(newChain))
    bootstrapKeplr()
  }
}
