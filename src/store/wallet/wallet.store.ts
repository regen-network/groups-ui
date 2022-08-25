import { OfflineSigner } from '@cosmjs/launchpad'
import type { AccountData } from '@cosmjs/proto-signing'
import { getSigningCosmosClient } from '@haveanicedavid/groups-ui-telescope'
// import { SigningStargateClient } from '@cosmjs/stargate'
import type { ChainInfo } from '@keplr-wallet/types'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'

import { allChainsArray } from 'chains'

import { enableKeplr } from './wallet.actions'
import { LOCALSTORAGE_CHAIN_KEY } from './wallet.constants'

const savedChain = localStorage.getItem(LOCALSTORAGE_CHAIN_KEY)

export type KeplrStatus = 'loading' | 'initialized' | 'rejected' | 'ready' | 'uninstalled'

const dummyClient = getSigningCosmosClient({
  signer: {} as OfflineSigner,
  rpcEndpoint: '',
})

type WalletStore = {
  account?: AccountData
  activeChain: ChainInfo
  allChains: ChainInfo[]
  keplrStatus: KeplrStatus
  client?: Awaited<typeof dummyClient>
  // offlineSigner?: OfflineSigner
}

export const walletStore = proxy<WalletStore>({
  account: undefined,
  allChains: allChainsArray,
  activeChain: savedChain ? JSON.parse(savedChain) : allChainsArray[0],
  keplrStatus: 'loading',
  client: undefined,
  // offlineSigner: undefined,
})

subscribeKey(walletStore, 'activeChain', () => {
  enableKeplr()
})
