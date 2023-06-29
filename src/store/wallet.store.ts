import { type AccountData, coins, type EncodeObject } from '@cosmjs/proto-signing'
import { Registry } from '@cosmjs/proto-signing'
import { AminoTypes, SigningStargateClient } from '@cosmjs/stargate'
import { cosmos, cosmosAminoConverters, cosmosProtoRegistry } from '@regen-network/api'
import { proxy } from 'valtio'

import { logError, throwError } from 'util/errors'

import { fetchValidators } from 'api/staking.actions'

import { groupAminoConverters } from '../api/group.amino' // TODO: fix amino converters

import { Chain } from './chain.store'
import { Query } from './query.store'

export type KeplrStatus = 'loading' | 'initialized' | 'rejected' | 'ready' | 'uninstalled'

type WalletStore = {
  account?: AccountData
  keplrStatus: KeplrStatus
  signingClient?: SigningStargateClient
}

export const Wallet = proxy<WalletStore>({
  keplrStatus: 'loading',
})

export async function bootstrapKeplr() {
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
    // NOTE: We use "auto" to support amino signing with ledger devices.
    // const offlineSigner = await keplr.getOfflineSignerAuto(chainId)
    // NOTE: We use "only amino" to support amino signing with ledger devices.
    // Using "only amino" also ensures messages are human-readable within keplr.
    const offlineSigner = await keplr.getOfflineSignerOnlyAmino(chainId)
    const [account] = await offlineSigner.getAccounts()

    // TODO: fix amino converters
    // const signingClient = await getSigningCosmosClient({
    //   rpcEndpoint: Chain.active.rpc,
    //   signer: offlineSigner,
    // })

    // NOTE: We use signing stargate client so that we can set amino types
    const registry = new Registry(cosmosProtoRegistry)
    const signingClient = await SigningStargateClient.connectWithSigner(
      Chain.active.rpc,
      offlineSigner,
      {
        registry,
        // TODO: fix amino converters
        aminoTypes: new AminoTypes({ ...cosmosAminoConverters, ...groupAminoConverters }),
      },
    )

    const lcdClient = await cosmos.ClientFactory.createLCDClient({
      restEndpoint: Chain.active.rest,
    })

    Query.groups = lcdClient.cosmos.group.v1
    Query.staking = lcdClient.cosmos.staking.v1beta1
    Query.bank = lcdClient.cosmos.bank.v1beta1
    Wallet.signingClient = signingClient
    Wallet.account = account
    Chain.stakeDenom = Chain.active.stakeCurrency.coinMinimalDenom
    Chain.fee = {
      amount: coins(10, Chain.active.feeCurrencies[0].coinDenom),
      gas: '2000000', // TODO how do I calculate this?
    }
    Wallet.keplrStatus = 'ready'
    fetchValidators()
  } catch (error) {
    Wallet.keplrStatus = 'rejected'
    logError(error)
  }
}

export async function signAndBroadcast(messages: EncodeObject[]) {
  const { account, signingClient } = Wallet
  const { fee } = Chain
  if (!account?.address || !signingClient || !fee) throwError('Wallet not initialized')
  return signingClient.signAndBroadcast(account.address, messages, fee)
}
