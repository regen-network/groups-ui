import { useSnapshot } from 'valtio'

import { allChainsArray } from 'chains'
import { setActiveChain, walletStore } from 'store'

import { SelectDropdown } from '@/molecules'

const CHAIN_ITEMS = allChainsArray.map(({ chainId, chainName }) => ({
  value: chainId,
  name: chainName,
}))

export const ChainSelect = () => {
  const snap = useSnapshot(walletStore)
  return (
    <SelectDropdown
      label={snap.activeChain.chainId ? '' : 'Select a Chain'}
      value={snap.activeChain.chainId}
      onChange={setActiveChain}
      items={CHAIN_ITEMS}
    />
  )
}
