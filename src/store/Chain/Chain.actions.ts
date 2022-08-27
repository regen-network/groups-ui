import { enableKeplr } from 'store/Wallet'

import { LOCALSTORAGE_CHAIN_KEY } from './Chain.constants'
import { Chain } from './Chain.store'

export function setActiveChain(chainId: string) {
  const newChain = Chain.all.find((chain) => chain.chainId === chainId)
  if (newChain) {
    Chain.active = newChain
    localStorage.setItem(LOCALSTORAGE_CHAIN_KEY, JSON.stringify(newChain))
    enableKeplr()
  }
}
