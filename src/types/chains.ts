// fixme: get additional properties like: coinDecimals, bip44, bech32Config, stakeCurrency, currencies, feeCurrencies, features
export interface Chain {
  readonly chainId: string
  readonly chainName: string
  readonly rpc: string
  readonly rest: string
  readonly coinDenom: string
  readonly coinMinimalDenom: string
}
