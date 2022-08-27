import { coins } from '@cosmjs/amino'
import { getSigningCosmosClient } from '@haveanicedavid/groups-ui-telescope'

import { Chain } from 'store/Chain'
import { handleError, throwError } from 'util/errors'

import { Wallet } from './Wallet.store'

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
    const client = await getSigningCosmosClient({
      rpcEndpoint: Chain.active.rpc,
      signer: offlineSigner,
    })
    Wallet.account = account
    Wallet.signingClient = client
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
