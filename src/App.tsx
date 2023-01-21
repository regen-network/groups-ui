import { useSnapshot } from 'valtio'

import { Routes } from 'routes'
import { useKeplr } from 'hooks/use-keplr'
import { Wallet } from 'store/wallet.store'

import { EnableKeplr } from 'pages/enable-keplr-page'
import { InstallKeplr } from 'pages/install-keplr-page'
import { Loading } from '@/molecules/loading'

export default function App() {
  useKeplr()
  const snap = useSnapshot(Wallet)

  switch (snap.keplrStatus) {
    case 'loading':
    case 'initialized':
      return <Loading />
    case 'ready':
      return <Routes />
    case 'uninstalled':
      return <InstallKeplr />
    case 'rejected':
      return <EnableKeplr />
    default:
      return <InstallKeplr />
  }
}
