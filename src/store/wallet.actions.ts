import { createError, handleError } from 'util/errors'

import { LOCALSTORAGE_CHAIN_KEY, walletStore } from './wallet.store'

export function setActiveChain(chainId: string) {
  const newChain = walletStore.allChains.find((chain) => chain.id === chainId)
  if (newChain) {
    walletStore.activeChain = newChain
    localStorage.setItem(LOCALSTORAGE_CHAIN_KEY, JSON.stringify(newChain))
  }
}

export async function enableKeplr() {
  if (!window.keplr) {
    walletStore.keplrStatus = 'uninstalled'
    createError('Keplr is not installed')
  }
  const chainId = walletStore.activeChain.id
  try {
    await window.keplr.enable(chainId)
    const offlineSigner = window.keplr.getOfflineSigner(chainId)
    const [account] = await offlineSigner.getAccounts()
    walletStore.account = account
    walletStore.keplrStatus = 'ready'
  } catch (error) {
    handleError(error)
  }
}
