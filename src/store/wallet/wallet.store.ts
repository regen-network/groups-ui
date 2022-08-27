import type { AccountData } from '@cosmjs/proto-signing'
import { SigningStargateClient, StdFee } from '@cosmjs/stargate'
import type { ChainInfo } from '@keplr-wallet/types'
import { proxy } from 'valtio'

import { allChainsArray } from 'chains'

import { LOCALSTORAGE_CHAIN_KEY } from './wallet.constants'

const savedChain = localStorage.getItem(LOCALSTORAGE_CHAIN_KEY)

export type KeplrStatus = 'loading' | 'initialized' | 'rejected' | 'ready' | 'uninstalled'

type WalletStore = {
  account?: AccountData
  activeChain: ChainInfo
  allChains: ChainInfo[]
  fee?: StdFee | 'auto' | number
  keplrStatus: KeplrStatus
  signingClient?: SigningStargateClient
}

export const wallet = proxy<WalletStore>({
  activeChain: savedChain ? JSON.parse(savedChain) : allChainsArray[0],
  allChains: allChainsArray,
  keplrStatus: 'loading',
})
