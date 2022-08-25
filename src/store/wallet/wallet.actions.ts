import { getSigningCosmosClient } from '@haveanicedavid/groups-ui-telescope'

import { handleError, throwError } from 'util/errors'

import { LOCALSTORAGE_CHAIN_KEY } from './wallet.constants'
import { walletStore } from './wallet.store'

export function setActiveChain(chainId: string) {
  const newChain = walletStore.allChains.find((chain) => chain.chainId === chainId)
  if (newChain) {
    walletStore.activeChain = newChain
    localStorage.setItem(LOCALSTORAGE_CHAIN_KEY, JSON.stringify(newChain))
  }
}

// TODO: reload on keplr account change
export async function enableKeplr() {
  if (!window.keplr) {
    walletStore.keplrStatus = 'uninstalled'
    throwError('Keplr is not installed')
  }
  if (walletStore.keplrStatus === 'loading') {
    walletStore.keplrStatus = 'initialized'
  }
  const chainId = walletStore.activeChain.chainId
  try {
    await window.keplr.experimentalSuggestChain(walletStore.activeChain)
    await window.keplr.enable(chainId)
    const offlineSigner = window.keplr.getOfflineSigner(chainId)
    const [account] = await offlineSigner.getAccounts()
    const client = await getSigningCosmosClient({
      rpcEndpoint: walletStore.activeChain.rpc,
      signer: offlineSigner,
    })

    walletStore.account = account
    walletStore.client = client
    walletStore.keplrStatus = 'ready'
  } catch (error) {
    walletStore.keplrStatus = 'rejected'
    handleError(error)
  }
}
