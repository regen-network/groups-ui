import { enableKeplr } from 'store/Wallet'

import { ChainSelect } from '@/organisms/ChainSelect'
import { AlertTemplate } from '@/templates/AlertTemplate'

export const EnableKeplr = () => {
  return (
    <AlertTemplate
      severity="info"
      text="You need to enable Keplr to run this app"
      btnText="Enable"
      onBtnClick={enableKeplr}
    >
      <ChainSelect />
    </AlertTemplate>
  )
}
