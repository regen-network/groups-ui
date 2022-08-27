import { useSnapshot } from 'valtio'

import { allChainsArray } from 'chains'
import { setActiveChain, Wallet } from 'store'

import { SelectDropdown } from '@/molecules'

const CHAIN_ITEMS = allChainsArray.map(({ chainId, chainName }) => ({
  value: chainId,
  name: chainName,
}))

export const ChainSelect = () => {
  const snap = useSnapshot(Wallet)
  return (
    <SelectDropdown
      label={snap.activeChain.chainId ? '' : 'Select a Chain'}
      value={snap.activeChain.chainId}
      onChange={setActiveChain}
      items={CHAIN_ITEMS}
    />
  )
}
