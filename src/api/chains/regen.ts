import type { AppCurrency, ChainInfo } from '@keplr-wallet/types'

import { Bech32Address } from 'util/bech32'

const { VITE_PROXY_URL } = import.meta.env

// TODO !important - this should be an .env file on netlify
const PROXY = VITE_PROXY_URL || 'https://regen-registry-server-staging.herokuapp.com'

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

/**
 * @see https://github.com/cosmos/chain-registry/blob/master/regen/chain.json
 */
export const regenTestnet: ChainInfo = {
  rpc: `${VITE_PROXY_URL}/ledger`,
  rest: `${VITE_PROXY_URL}/ledger-rest`,
  chainId: 'regen-redwood-1',
  chainName: 'Regen Redwood Testnet',
  stakeCurrency: REGEN,
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config('regen'),
  currencies,
  feeCurrencies: currencies,
}
