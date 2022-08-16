import { Bech32Address } from '@keplr-wallet/cosmos'
import { ChainInfo } from '@keplr-wallet/types'

function getDefaultChainInfo(): ChainInfo {
  const lsChainInfo = window.localStorage.getItem('chainInfo')
  if (lsChainInfo) {
    return JSON.parse(lsChainInfo)
  }

  return {
    rpc: `http://${window.location.hostname}:26657`,
    rest: `http://${window.location.hostname}:1317`,
    chainId: 'cosmoswithgroups',
    // chainName: "GROUPS-UI-REGEN-TEST",
    chainName: 'GROUPS-UI-SDK-TEST',
    stakeCurrency: {
      // coinDenom: "UREGEN",
      coinDenom: 'STAKE',
      // coinMinimalDenom: "uregen",
      coinMinimalDenom: 'stake',
      coinDecimals: 6,
    },
    bip44: {
      coinType: 118,
    },
    // bech32Config: Bech32Address.defaultBech32Config("regen"),
    bech32Config: Bech32Address.defaultBech32Config('cosmos'),
    currencies: [
      {
        // coinDenom: "UREGEN",
        coinDenom: 'STAKE',
        // coinMinimalDenom: "uregen",
        coinMinimalDenom: 'stake',
        coinDecimals: 6,
      },
    ],
    feeCurrencies: [
      {
        // coinDenom: "UREGEN",
        coinDenom: 'STAKE',
        // coinMinimalDenom: "uregen",
        coinMinimalDenom: 'stake',
        coinDecimals: 6,
      },
    ],
    features: ['stargate', 'ibc-transfer'],
  }
}
