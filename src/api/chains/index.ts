/**
 * Ideally, this would be pulled from the chain registry
 * (https://github.com/cosmos/chain-registry), but until there's more >0.46
 * adoption, that doesn't make much sense
 *
 * Structured after graz to possibly use their lib in the future
 * (currently using adds 6mb to bundle)
 * @see https://github.com/strangelove-ventures/graz/tree/dev/packages/graz/src/chains
 */
import type { ChainInfo } from '@keplr-wallet/types'

const { VITE_LOCAL_HOSTNAME, VITE_PROXY_URL } = import.meta.env

// import { axelar } from './axelar'
// import { cosmosLocal } from './cosmos-local'
import { regenLocal, regenTestnet } from './regen'
// import { cosmoshub } from './cosmoshub'
// import { juno } from './juno'
// import { junoTestnet } from './juno-testnet'
// import { osmosis } from './osmosis'
// import { osmosisTestnet } from './osmosis-testnet'

// export const mainnetChainsArray: ChainInfo[] = [cosmoshub, axelar, juno, osmosis]
export const mainnetChainsArray: ChainInfo[] = []

export const testnetChainsArray: ChainInfo[] = [
  ...(VITE_PROXY_URL ? [regenTestnet] : []),
  ...(VITE_LOCAL_HOSTNAME ? [regenLocal] : []),
]

export const allChainsArray: ChainInfo[] = [...mainnetChainsArray, ...testnetChainsArray]
