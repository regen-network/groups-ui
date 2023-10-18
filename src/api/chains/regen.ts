import type { AppCurrency } from '@keplr-wallet/types'

import { Bech32Address } from 'util/bech32'

import { ChainInfoExtended } from './index'

const {
  VITE_LOCAL_HOSTNAME,
  VITE_PROXY_URL_QWOYN_MAINNET,
  VITE_PROXY_URL_QWOYN_TESTNET,
  VITE_INDEXER_GRAPHQL_API_QWOYN_LOCAL,
  VITE_INDEXER_GRAPHQL_API_QWOYN_MAINNET,
  VITE_INDEXER_GRAPHQL_API_QWOYN_TESTNET,
} = import.meta.env

const QWOYN: AppCurrency = {
  coinDenom: 'qwoyn',
  coinMinimalDenom: 'uqwoyn',
  coinDecimals: 6,
  coinGeckoId: 'qwoyn',
  coinImageUrl:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/qwoyn/images/qwoyn.png',
}

/**
 *  @see https://github.com/cosmos/chain-registry/blob/master/qwoyn/assetlist.json
 */
const currencies: AppCurrency[] = [QWOYN]

export const qwoynLocal: ChainInfoExtended = {
  // hardcoded port values based on makefile
  rpc: VITE_LOCAL_HOSTNAME ? `${VITE_LOCAL_HOSTNAME}:26657` : 'http://127.0.0.1:26657',
  rest: VITE_LOCAL_HOSTNAME ? `${VITE_LOCAL_HOSTNAME}:1317` : 'http://127.0.0.1:1317',
  indexer:
    VITE_INDEXER_GRAPHQL_API_QWOYN_LOCAL || 'http://127.0.0.1:5000/indexer/v1/graphql',
  chainId: 'qwoyn-local',
  chainName: 'Qwoyn Local',
  stakeCurrency: QWOYN,
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config('qwoyn'),
  currencies,
  feeCurrencies: currencies,
}

/**
 * @see https://github.com/cosmos/chain-registry/blob/master/qwoyn/chain.json
 */
export const qwoynMainnet: ChainInfoExtended = {
  rpc: VITE_PROXY_URL_QWOYN_MAINNET
    ? `${VITE_PROXY_URL_QWOYN_MAINNET}/ledger`
    : 'https://api.qwoyn.studio/ledger',
  rest: VITE_PROXY_URL_QWOYN_MAINNET
    ? `${VITE_PROXY_URL_QWOYN_MAINNET}/ledger-rest`
    : 'https://api.qwoyn.studio/ledger-rest',
  indexer:
    VITE_INDEXER_GRAPHQL_API_QWOYN_MAINNET ||
    'https://api.qwoyn.studio/indexer/v1/graphql',
  chainId: 'qwoyn-1',
  chainName: 'Qwoyn',
  stakeCurrency: QWOYN,
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config('qwoyn'),
  currencies,
  feeCurrencies: currencies,
}

export const qwoynTestnet: ChainInfoExtended = {
  rpc: VITE_PROXY_URL_QWOYN_TESTNET
    ? `${VITE_PROXY_URL_QWOYN_TESTNET}/ledger`
    : 'https://66.42.74.12:26657/ledger',
  rest: VITE_PROXY_URL_QWOYN_TESTNET
    ? `${VITE_PROXY_URL_QWOYN_TESTNET}/ledger-rest`
    : 'https://api.qwoyn.studio/ledger-rest',
  indexer:
    VITE_INDEXER_GRAPHQL_API_QWOYN_TESTNET ||
    'https://66.42.74.12:1317/indexer/v1/graphql',
  chainId: 'earendel-1',
  chainName: 'Qwoyn Testnet',
  stakeCurrency: QWOYN,
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config('qwoyn'),
  currencies,
  feeCurrencies: currencies,
}
