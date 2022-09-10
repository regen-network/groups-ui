import type { ChainInfo } from '@keplr-wallet/types'
import { proxy } from 'valtio'

import { LOCALSTORAGE_CHAIN_KEY } from 'util/constants'

import { allChainsArray } from 'api/chains'

import { enableKeplr } from './wallet.store'

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

export function setActiveChain(chainId: string) {
  const newChain = Chain.all.find((chain) => chain.chainId === chainId)
  if (newChain) {
    Chain.active = newChain
    localStorage.setItem(LOCALSTORAGE_CHAIN_KEY, JSON.stringify(newChain))
    enableKeplr()
  }
}
