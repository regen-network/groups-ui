import { ChainInfo } from '@keplr-wallet/types'

import { cosmoshub } from './cosmoshub'
import { juno } from './juno'
import { junoTestnet } from './juno-testnet'
import { osmosis } from './osmosis'
import { osmosisTestnet } from './osmosis-testnet'

export const mainnetChainsArray: ChainInfo[] = [cosmoshub, juno, osmosis]

export const testnetChainsArray: ChainInfo[] = [junoTestnet, osmosisTestnet]

export const allChainsArray: ChainInfo[] = [...mainnetChainsArray, ...testnetChainsArray]
