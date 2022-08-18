import type { AccountData, OfflineSigner } from '@cosmjs/proto-signing'
import type { ChainInfo } from '@keplr-wallet/types'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import { allChainsArray } from 'chains'

import { enableKeplr } from './wallet.actions'
import { LOCALSTORAGE_CHAIN_KEY } from './wallet.constants'

const savedChain = localStorage.getItem(LOCALSTORAGE_CHAIN_KEY)

export type KeplrStatus = 'loading' | 'initialized' | 'rejected' | 'ready' | 'uninstalled'

type WalletStore = {
  account?: AccountData
  activeChain: ChainInfo
  allChains: ChainInfo[]
  keplrStatus: KeplrStatus
  offlineSigner?: OfflineSigner
}

export const walletStore = proxy<WalletStore>({
  account: undefined,
  allChains: allChainsArray,
  activeChain: savedChain ? JSON.parse(savedChain) : allChainsArray[0],
  keplrStatus: 'loading',
  offlineSigner: undefined,
})

subscribeKey(walletStore, 'activeChain', () => {
  enableKeplr()
})
