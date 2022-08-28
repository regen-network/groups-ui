import { useSnapshot } from 'valtio'

import { allChainsArray } from 'chains'
import { Chain, setActiveChain } from 'store/Chain'

import { SelectDropdown } from '@/molecules'

const CHAIN_ITEMS = allChainsArray.map(({ chainId, chainName }) => ({
  value: chainId,
  name: chainName,
}))

export const ChainSelect = () => {
  const { active } = useSnapshot(Chain)
  return (
    <SelectDropdown
      label={active.chainId ? '' : 'Select a Chain'}
      value={active.chainId}
      onChange={setActiveChain}
      items={CHAIN_ITEMS}
    />
  )
}
