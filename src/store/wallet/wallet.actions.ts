import { coins } from '@cosmjs/amino'
import { getSigningCosmosClient } from '@haveanicedavid/groups-ui-telescope'

import { handleError, throwError } from 'util/errors'

import { LOCALSTORAGE_CHAIN_KEY } from './Wallet.constants'
import { Wallet } from './Wallet.store'

export function setActiveChain(chainId: string) {
  const newChain = Wallet.allChains.find((chain) => chain.chainId === chainId)
  if (newChain) {
    Wallet.activeChain = newChain
    localStorage.setItem(LOCALSTORAGE_CHAIN_KEY, JSON.stringify(newChain))
    enableKeplr()
  }
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
  const chainId = Wallet.activeChain.chainId
  try {
    await keplr.experimentalSuggestChain(Wallet.activeChain)
    await keplr.enable(chainId)
    const offlineSigner = keplr.getOfflineSigner(chainId)
    const [account] = await offlineSigner.getAccounts()
    const client = await getSigningCosmosClient({
      rpcEndpoint: Wallet.activeChain.rpc,
      signer: offlineSigner,
    })
    Wallet.account = account
    Wallet.signingClient = client
    Wallet.fee = {
      amount: coins(0, Wallet.activeChain.feeCurrencies[0].coinDenom),
      gas: '2000000', // TODO how do I calculate this?
    }
    Wallet.keplrStatus = 'ready'
  } catch (error) {
    Wallet.keplrStatus = 'rejected'
    handleError(error)
  }
}
