import { coins } from '@cosmjs/amino'
import { cosmos, getSigningCosmosClient } from '@haveanicedavid/cosmos-groups-ts'

import { Chain } from 'store/Chain'
import { Group } from 'store/Group'
import { handleError, throwError } from 'util/errors'

import { Wallet } from './Wallet.store'

export async function resetKeplr() {
  Wallet.keplrStatus = 'initialized'
  enableKeplr()
}

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
