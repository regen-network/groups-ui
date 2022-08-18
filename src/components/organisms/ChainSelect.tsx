import { useSnapshot } from 'valtio'

import { allChainsArray } from 'chains'
import { setActiveChain, walletStore } from 'store'

import { SelectDropdown } from '@/molecules'

const CHAIN_ITEMS = allChainsArray.map(({ chainId, chainName }) => ({
  value: chainId,
  name: chainName,
}))

export const ChainSelect = () => {
  // see: https://github.com/pmndrs/eslint-plugin-valtio/issues/32
  // could change to `export function` to fix, but should be able to update soon
  // eslint-disable-next-line
  const snap = useSnapshot(walletStore)
  return (
    <SelectDropdown
      label="Select a Chain"
      value={snap.activeChain.chainId}
      onChange={setActiveChain}
      items={CHAIN_ITEMS}
    />
  )
}
