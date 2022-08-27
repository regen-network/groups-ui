import { coins } from '@cosmjs/amino'
import { getSigningCosmosClient } from '@haveanicedavid/groups-ui-telescope'

import { handleError, throwError } from 'util/errors'

import { LOCALSTORAGE_CHAIN_KEY } from './wallet.constants'
import { wallet } from './wallet.store'

export function setActiveChain(chainId: string) {
  const newChain = wallet.allChains.find((chain) => chain.chainId === chainId)
  if (newChain) {
    wallet.activeChain = newChain
    localStorage.setItem(LOCALSTORAGE_CHAIN_KEY, JSON.stringify(newChain))
    enableKeplr()
  }
}

// TODO: reload on keplr account change
export async function enableKeplr() {
  const { keplr } = window
  if (!keplr) {
    wallet.keplrStatus = 'uninstalled'
    throwError('Keplr is not installed')
  }
  if (wallet.keplrStatus === 'loading') {
    wallet.keplrStatus = 'initialized'
  }
  const chainId = wallet.activeChain.chainId
  try {
    await keplr.experimentalSuggestChain(wallet.activeChain)
    await keplr.enable(chainId)
    const offlineSigner = keplr.getOfflineSigner(chainId)
    const [account] = await offlineSigner.getAccounts()
    const client = await getSigningCosmosClient({
      rpcEndpoint: wallet.activeChain.rpc,
      signer: offlineSigner,
    })
    wallet.account = account
    wallet.signingClient = client
    wallet.fee = {
      amount: coins(0, wallet.activeChain.feeCurrencies[0].coinDenom),
      gas: '2000000', // TODO how do I calculate this?
    }
    wallet.keplrStatus = 'ready'
  } catch (error) {
    wallet.keplrStatus = 'rejected'
    handleError(error)
  }
}
