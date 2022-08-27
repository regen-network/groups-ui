import type { AccountData } from '@cosmjs/proto-signing'
import { SigningStargateClient, StdFee } from '@cosmjs/stargate'
import { proxy } from 'valtio'

export type KeplrStatus = 'loading' | 'initialized' | 'rejected' | 'ready' | 'uninstalled'

type WalletStore = {
  account?: AccountData
  fee?: StdFee | 'auto' | number
  keplrStatus: KeplrStatus
  signingClient?: SigningStargateClient
}

export const Wallet = proxy<WalletStore>({
  keplrStatus: 'loading',
})
