import { Routes } from 'routes'
import { useSnapshot } from 'valtio'

import { Wallet } from 'store'
import { useKeplr } from 'hooks/use-keplr'

import { EnableKeplr } from 'pages/enable-keplr'
import { InstallKeplr } from 'pages/install-keplr'
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
