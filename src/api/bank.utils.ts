import type { CoinSDKType, UICoin } from 'types'

export function toCoin({ amount, denom }: CoinSDKType): UICoin {
  return {
    amount,
    denom,
  }
}
