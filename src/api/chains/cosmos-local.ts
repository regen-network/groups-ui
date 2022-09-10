import type { AppCurrency, ChainInfo } from '@keplr-wallet/types'

import { Bech32Address } from 'util/bech32'

const { VITE_LOCAL_HOSTNAME } = import.meta.env

const STAKE: AppCurrency = {
  coinDenom: 'STAKE',
  coinMinimalDenom: 'stake',
  coinDecimals: 6,
  coinGeckoId: 'cosmos',
  coinImageUrl:
    'https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png',
}

const currencies: AppCurrency[] = [STAKE]

/** for local dev */
export const cosmos_local: ChainInfo = {
  // hardcoded port values based on makefile
  rpc: `${VITE_LOCAL_HOSTNAME}:26657`,
  rest: `${VITE_LOCAL_HOSTNAME}:1317`,
  chainId: 'cosmoswithgroups',
  chainName: 'GROUPS-UI-SDK-TEST',
  stakeCurrency: STAKE,
  bip44: {
    coinType: 118,
  },
  bech32Config: Bech32Address.defaultBech32Config('cosmos'),
  currencies,
  feeCurrencies: currencies,
}
