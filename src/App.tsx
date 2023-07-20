import { useSnapshot } from 'valtio'

import { Routes } from 'routes'
import { useKeplr } from 'hooks/use-keplr'
import { Wallet } from 'store/wallet.store'

import { EnableKeplr } from 'pages/enable-keplr-page'
import { InstallKeplr } from 'pages/install-keplr-page'
import { Loading } from '@/molecules/loading'
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import { AllProposalsDocument } from 'gql/graphql'

export default function App() {
  useKeplr()
  const snap = useSnapshot(Wallet)
  const { data } = useQuery(['proposals'], async () =>
    request('http://localhost:5000/indexer/graphql', AllProposalsDocument),
  )
  console.log(data?.allProposals?.nodes)

  switch (snap.keplrStatus) {
    case 'ready':
      return <Routes />
    case 'loading':
    case 'initialized':
      return <Loading />
    case 'uninstalled':
      return <InstallKeplr />
    case 'rejected':
      return <EnableKeplr />
    default:
      return <InstallKeplr />
  }
}
