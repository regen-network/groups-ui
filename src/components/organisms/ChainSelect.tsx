import { useSnapshot } from 'valtio'

import { allChainsArray } from 'chains'
import { setActiveChain, wallet } from 'store'

import { SelectDropdown } from '@/molecules'

const CHAIN_ITEMS = allChainsArray.map(({ chainId, chainName }) => ({
  value: chainId,
  name: chainName,
}))

export const ChainSelect = () => {
  const snap = useSnapshot(wallet)
  return (
    <SelectDropdown
      label={snap.activeChain.chainId ? '' : 'Select a Chain'}
      value={snap.activeChain.chainId}
      onChange={setActiveChain}
      items={CHAIN_ITEMS}
    />
  )
}
