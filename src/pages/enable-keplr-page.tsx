import { bootstrapKeplr } from 'store/wallet.store'

import { ChainSelect } from '@/organisms/chain-select'
import { AlertTemplate } from '@/templates/alert-template'

export const EnableKeplr = () => {
  return (
    <AlertTemplate
      status="info"
      text="You need to enable Keplr to run this app"
      btnText="Enable"
      onBtnClick={bootstrapKeplr}
    >
      <ChainSelect />
    </AlertTemplate>
  )
}
