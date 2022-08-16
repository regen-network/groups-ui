import { handleError, throwError } from 'util/errors'

import { LOCALSTORAGE_CHAIN_KEY, walletStore } from './wallet.store'

export function setActiveChain(chainId: string) {
  const newChain = walletStore.allChains.find((chain) => chain.chainId === chainId)
  if (newChain) {
    walletStore.activeChain = newChain
    localStorage.setItem(LOCALSTORAGE_CHAIN_KEY, JSON.stringify(newChain))
  }
}

export async function enableKeplr() {
  if (!window.keplr) {
    walletStore.keplrStatus = 'uninstalled'
    throwError('Keplr is not installed')
  }
  if (walletStore.keplrStatus === 'loading') {
    walletStore.keplrStatus = 'initialized'
  }
  const chainId = walletStore.activeChain.chainId
  console.log('enableKeplr')
  try {
    await window.keplr.enable(chainId)
    const offlineSigner = window.keplr.getOfflineSigner(chainId)
    const [account] = await offlineSigner.getAccounts()
    walletStore.account = account
    walletStore.keplrStatus = 'ready'
  } catch (error) {
    walletStore.keplrStatus = 'rejected'
    handleError(error)
  }
}
