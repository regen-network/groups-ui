import type { AccountData, OfflineSigner } from '@cosmjs/proto-signing'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import { CHAIN_LIST } from 'stubs/chains/chains'
import { UiChain } from 'types/chains'

import { enableKeplr } from './wallet.actions'

export const LOCALSTORAGE_CHAIN_KEY = 'active-chain'
const savedChain = localStorage.getItem(LOCALSTORAGE_CHAIN_KEY)

export type KeplrStatus = 'loading' | 'initialized' | 'rejected' | 'ready' | 'uninstalled'

type WalletStore = {
  account?: AccountData
  activeChain: UiChain
  allChains: UiChain[]
  keplrStatus: KeplrStatus
  offlineSigner?: OfflineSigner
}

export const walletStore = proxy<WalletStore>({
  account: undefined,
  activeChain: savedChain ? JSON.parse(savedChain) : CHAIN_LIST[0],
  allChains: CHAIN_LIST,
  keplrStatus: 'loading',
  offlineSigner: undefined,
})

subscribeKey(walletStore, 'activeChain', () => {
  enableKeplr()
})
