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

const {
  VITE_LOCAL_HOSTNAME,
  VITE_PROXY_URL_QWOYN_MAINNET,
  VITE_PROXY_URL_QWOYN_TESTNET,
} = import.meta.env

import { qwoynLocal, qwoynMainnet, qwoynTestnet } from './regen'

export interface ChainInfoExtended extends ChainInfo {
  indexer: string
}

export const mainnetChainsArray: ChainInfoExtended[] = [
  ...(VITE_PROXY_URL_QWOYN_MAINNET ? [qwoynMainnet] : []),
]

export const testnetChainsArray: ChainInfoExtended[] = [
  ...(VITE_PROXY_URL_QWOYN_TESTNET ? [qwoynTestnet] : []),
  ...(VITE_LOCAL_HOSTNAME ? [qwoynLocal] : []),
]

export const allChainsArray: ChainInfoExtended[] = [
  ...mainnetChainsArray,
  ...testnetChainsArray,
]
