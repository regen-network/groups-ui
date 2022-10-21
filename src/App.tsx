import { ErrorBoundary } from 'react-error-boundary'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router, Routes } from 'routes'
import { useSnapshot } from 'valtio'

import { Wallet } from 'store'
import { useKeplr } from 'hooks/use-keplr'

import { EnableKeplr } from 'pages/enable-keplr'
import { InstallKeplr } from 'pages/install-keplr'
import { Loading } from '@/molecules/loading'
import { ErrorFallback } from '@/organisms/error-fallback'

const queryClient = new QueryClient()

function AppContent() {
  const snap = useSnapshot(Wallet)

  switch (snap.keplrStatus) {
    case 'loading':
    case 'initialized':
      return <Loading />
    case 'ready':
      // return <Routes />
      return <RouterProvider router={router} />
    case 'uninstalled':
      return <InstallKeplr />
    case 'rejected':
      return <EnableKeplr />
    default:
      return <InstallKeplr />
  }
}

export default function App() {
  useKeplr()

  function handleReset() {
    window.location.reload()
  }

  return (
    // <QueryClientProvider client={queryClient}>
    // <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
    <AppContent />
    // </ErrorBoundary>
    // </QueryClientProvider>
  )
}
