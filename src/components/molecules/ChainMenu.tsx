import type { SelectChangeEvent } from '@mui/material'
import { FormControl } from '@mui/material'

import type { Chain } from 'types/chains'

import { MenuItem, Select } from '@/atoms'

export const ChainMenu = (props: {
  chains: Chain[]
  activeChain: Chain
  setChain: (chain: Chain) => void
}) => {
  const { chains, setChain, activeChain } = props

  const handleChange = (event: SelectChangeEvent) => {
    const newChain = chains.find((chain) => chain.chainId === event.target.value)
    if (newChain) setChain(newChain)
  }

  return (
    <FormControl fullWidth>
      <Select value={activeChain.chainId} onChange={handleChange}>
        {chains.map((chain, i) => (
          <MenuItem key={chain.chainId + i} value={chain.chainId}>
            {chain.chainName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
