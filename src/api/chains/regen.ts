import type { AppCurrency, ChainInfo } from '@keplr-wallet/types'

import { Bech32Address } from 'util/bech32'

const REGEN: AppCurrency = {
  coinDenom: 'regen',
  coinMinimalDenom: 'uregen',
  coinDecimals: 6,
  coinGeckoId: 'regen',
  coinImageUrl:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/regen/images/regen.png',
}

/**
 *  @see https://github.com/cosmos/chain-registry/blob/master/regen/assetlist.json
 */
const currencies: AppCurrency[] = [REGEN]

const redwoodBasePath = 'http://redwood.regen.network'

/**
 * @see https://github.com/cosmos/chain-registry/blob/master/regen/chain.json
 */
export const regenTestnet: ChainInfo = {
  rpc: `${redwoodBasePath}:26657/`,
  rest: `${redwoodBasePath}:1317/`,
  chainId: 'regen-redwood-1',
  chainName: 'Regen Redwood',
  stakeCurrency: REGEN,
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config('regen'),
  currencies,
  feeCurrencies: currencies,
}
