import type { AppCurrency } from '@keplr-wallet/types'

import { Bech32Address } from 'util/bech32'

import { ChainInfoExtended } from './index'

const {
  VITE_LOCAL_HOSTNAME,
  VITE_PROXY_URL_REGEN_MAINNET,
  VITE_PROXY_URL_REGEN_TESTNET,
  VITE_INDEXER_GRAPHQL_API_REGEN_LOCAL,
  VITE_INDEXER_GRAPHQL_API_REGEN_MAINNET,
  VITE_INDEXER_GRAPHQL_API_REGEN_TESTNET,
} = import.meta.env

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

export const regenLocal: ChainInfoExtended = {
  // hardcoded port values based on makefile
  rpc: VITE_LOCAL_HOSTNAME ? `${VITE_LOCAL_HOSTNAME}:26657` : 'http://127.0.0.1:26657',
  rest: VITE_LOCAL_HOSTNAME ? `${VITE_LOCAL_HOSTNAME}:1317` : 'http://127.0.0.1:1317',
  indexer:
    VITE_INDEXER_GRAPHQL_API_REGEN_LOCAL || 'http://localhost:5000/indexer/graphql',
  chainId: 'regen-local',
  chainName: 'Regen Local',
  stakeCurrency: REGEN,
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config('regen'),
  currencies,
  feeCurrencies: currencies,
}

/**
 * @see https://github.com/cosmos/chain-registry/blob/master/regen/chain.json
 */
export const regenMainnet: ChainInfoExtended = {
  rpc: VITE_PROXY_URL_REGEN_MAINNET
    ? `${VITE_PROXY_URL_REGEN_MAINNET}/ledger`
    : 'https://api.registry.regen.network/ledger',
  rest: VITE_PROXY_URL_REGEN_MAINNET
    ? `${VITE_PROXY_URL_REGEN_MAINNET}/ledger-rest`
    : 'https://api.registry.regen.network/ledger-rest',
  indexer:
    VITE_INDEXER_GRAPHQL_API_REGEN_MAINNET ||
    'https://api.regen.network/indexer/v1/graphql',
  chainId: 'regen-1',
  chainName: 'Regen',
  stakeCurrency: REGEN,
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config('regen'),
  currencies,
  feeCurrencies: currencies,
}

export const regenTestnet: ChainInfoExtended = {
  rpc: VITE_PROXY_URL_REGEN_TESTNET
    ? `${VITE_PROXY_URL_REGEN_TESTNET}/ledger`
    : 'https://api-staging.registry.regen.network/ledger',
  rest: VITE_PROXY_URL_REGEN_TESTNET
    ? `${VITE_PROXY_URL_REGEN_TESTNET}/ledger-rest`
    : 'https://api.registry.regen.network/ledger-rest',
  indexer:
    VITE_INDEXER_GRAPHQL_API_REGEN_TESTNET ||
    'https://api-staging.regen.network/indexer/v1/graphql',
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
