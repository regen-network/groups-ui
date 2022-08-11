import { enableKeplr } from 'store'

import { AlertTemplate } from '@/templates'

export const EnableKeplr = () => {
  return (
    <AlertTemplate
      severity="info"
      text="You need to enable Keplr to run this app"
      btnText="Enable"
      onBtnClick={enableKeplr}
    />
  )
}
