/**
 * Structured after graz to possibly use their lib in the future
 * (currently adds 6mb to bundle)
 * @see https://github.com/strangelove-ventures/graz/tree/dev/packages/graz/src/chains
 */
import type { ChainInfo } from '@keplr-wallet/types'

import { axelar } from './axelar'
import { cosmos_local } from './cosmos-local'
import { cosmoshub } from './cosmoshub'
import { juno } from './juno'
import { junoTestnet } from './juno-testnet'
import { osmosis } from './osmosis'
import { osmosisTestnet } from './osmosis-testnet'

export const mainnetChainsArray: ChainInfo[] = [
  cosmoshub,
  axelar,
  juno,
  osmosis,
  cosmos_local,
]

export const testnetChainsArray: ChainInfo[] = [junoTestnet, osmosisTestnet]

export const allChainsArray: ChainInfo[] = [...mainnetChainsArray, ...testnetChainsArray]
