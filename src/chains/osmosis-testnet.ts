import type { ChainInfo } from '@keplr-wallet/types'

import { Bech32Address } from 'util/bech32'

const OSMO = {
  coinDenom: 'osmo',
  coinMinimalDenom: 'uosmo',
  coinDecimals: 6,
  coinGeckoId: 'osmosis',
  coinImageUrl: 'https://dhj8dql1kzq2v.cloudfront.net/white/osmo.png',
}

const currencies = [OSMO]

export const osmosisTestnet: ChainInfo = {
  rpc: 'https://testnet-rpc.osmosis.zone',
  rest: 'https://testnet-rest.osmosis.zone',
  chainId: 'osmo-test-4',
  chainName: 'Osmosis Testnet',
  stakeCurrency: OSMO,
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config('osmo'),
  currencies,
  feeCurrencies: [OSMO],
  coinType: 118,
}
