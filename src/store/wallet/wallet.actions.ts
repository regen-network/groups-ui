import { coins } from '@cosmjs/amino'
import { createProtobufRpcClient, QueryClient } from '@cosmjs/stargate'
import { Tendermint34Client } from '@cosmjs/tendermint-rpc'
import { cosmos, getSigningCosmosClient } from '@haveanicedavid/groups-ui-telescope'

import { Chain, Group } from 'store'
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
    const signingClient = await getSigningCosmosClient({
      rpcEndpoint: Chain.active.rpc,
      signer: offlineSigner,
    })
    const tmClient = await Tendermint34Client.connect(Chain.active.rpc)
    const QueryClientImpl = cosmos.group.v1.QueryClientImpl
    const client = new QueryClient(tmClient)
    const rpc = createProtobufRpcClient(client)
    const queryService = new QueryClientImpl(rpc)
    Group.queryService = queryService
    Wallet.account = account
    Wallet.signingClient = signingClient
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
