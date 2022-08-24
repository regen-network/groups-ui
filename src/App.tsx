import { ErrorBoundary } from 'react-error-boundary'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes } from 'Routes'
import { useSnapshot } from 'valtio'

import { useAppTheme, useKeplr } from 'hooks'
import { walletStore } from 'store'

import { EnableKeplr } from 'pages/EnableKeplr'
import { InstallKeplr } from 'pages/InstallKeplr'
import { Spinner } from '@/molecules'
import { ErrorFallback } from '@/organisms'

function AppContent() {
  const snap = useSnapshot(walletStore)

  switch (snap.keplrStatus) {
    case 'loading':
      return <Spinner />
    case 'ready':
      return <Routes />
    case 'uninstalled':
      return <InstallKeplr />
    case 'initialized':
    case 'rejected':
      return <EnableKeplr />
    default:
      return <InstallKeplr />
  }
}

export default function App() {
  useKeplr()
  const theme = useAppTheme()

  function handleReset() {
    window.location.reload()
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </ErrorBoundary>
  )
}
