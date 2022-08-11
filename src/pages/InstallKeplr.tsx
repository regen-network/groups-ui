import { openExternalLink } from 'util/helpers'

import { AlertTemplate } from '@/templates'

export const InstallKeplr = () => {
  return (
    <AlertTemplate
      text="You need Keplr to run this app"
      btnText="Install"
      onBtnClick={() => openExternalLink('https://wallet.keplr.app/#/home')}
    />
  )
}
