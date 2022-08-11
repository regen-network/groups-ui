import type { AccountData, OfflineSigner } from '@cosmjs/proto-signing'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import { CHAIN_LIST } from 'stubs/chains'
import { Chain } from 'types/chains'

import { enableKeplr } from './wallet.actions'

export const LOCALSTORAGE_CHAIN_KEY = 'active-chain'
const savedChain = localStorage.getItem(LOCALSTORAGE_CHAIN_KEY)

export type KeplrStatus = 'loading' | 'initialized' | 'rejected' | 'ready' | 'uninstalled'

type WalletStore = {
  account?: AccountData
  // activeChain: ChainInfo
  // allChains: ChainInfo[]
  activeChain: Chain
  allChains: Chain[]
  keplrStatus: KeplrStatus
  offlineSigner?: OfflineSigner
}

export const walletStore = proxy<WalletStore>({
  account: undefined,
  activeChain: savedChain ? JSON.parse(savedChain) : CHAIN_LIST[0],
  // activeChain: savedChain ? JSON.parse(savedChain) : allChainsArray[0],
  // allChains: allChainsArray,
  allChains: CHAIN_LIST,
  keplrStatus: 'loading',
  offlineSigner: undefined,
})

subscribeKey(walletStore, 'activeChain', () => {
  enableKeplr()
})
