import { useSnapshot } from 'valtio'

import { allChainsArray } from 'api/chains'
import { Chain, setActiveChain } from 'store/chain.store'

import { SelectDropdown } from '@/molecules/select-dropdown'

const CHAIN_ITEMS = allChainsArray.map(({ chainId, chainName }) => ({
  value: chainId,
  label: chainName,
}))

export const ChainSelect = () => {
  const { active } = useSnapshot(Chain)
  // we only want to show this if there are multiple chains
  if (CHAIN_ITEMS.length <= 1) return null

  return (
    <SelectDropdown
      label={active.chainId ? '' : 'Select a Chain'}
      selected={CHAIN_ITEMS.find((item) => item.value === active.chainId)}
      onChange={(newChain) => {
        if (newChain?.value) setActiveChain(newChain.value)
      }}
      items={CHAIN_ITEMS}
    />
  )
}
