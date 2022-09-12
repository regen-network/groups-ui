import { AccountData, coins, EncodeObject } from '@cosmjs/proto-signing'
import { SigningStargateClient, StdFee } from '@cosmjs/stargate'
import { cosmos, getSigningCosmosClient } from '@haveanicedavid/cosmos-groups-ts'
import { proxy } from 'valtio'

import { handleError, throwError } from 'util/errors'

import { Chain } from './chain.store'
import { Group } from './group.store'

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

// TODO: reload on keplr account change
export async function enableKeplr() {
  const { keplr } = window
  if (!keplr) {
    Wallet.keplrStatus = 'uninstalled'
    throwError('Keplr is not installed')
  }
  if (Wallet.keplrStatus === 'loading') {
    Wallet.keplrStatus = 'initialized'
  }
  const chainId = Chain.active.chainId
  try {
    await keplr.experimentalSuggestChain(Chain.active)
    await keplr.enable(chainId)
    const offlineSigner = keplr.getOfflineSigner(chainId)
    const [account] = await offlineSigner.getAccounts()
    const signingClient = await getSigningCosmosClient({
      rpcEndpoint: Chain.active.rpc,
      signer: offlineSigner,
    })
    const lcdClient = await cosmos.ClientFactory.createLCDClient({
      restEndpoint: Chain.active.rest,
    })

    Group.query = lcdClient.cosmos.group.v1
    Wallet.signingClient = signingClient
    Wallet.account = account
    Wallet.fee = {
      amount: coins(0, Chain.active.feeCurrencies[0].coinDenom),
      gas: '2000000', // TODO how do I calculate this?
    }
    Wallet.keplrStatus = 'ready'
  } catch (error) {
    Wallet.keplrStatus = 'rejected'
    handleError(error)
  }
}

export async function signAndBroadcast(messages: EncodeObject[]) {
  const { account, signingClient, fee } = Wallet
  if (!account || !signingClient || !fee) throwError('Wallet not initialized')
  return signingClient.signAndBroadcast(account.address, messages, fee)
}
