import { CssBaseline, ThemeProvider } from '@mui/material'
import { Routes } from 'Routes'
import { useSnapshot } from 'valtio'

import { useAppTheme } from 'hooks'
import { InstallKeplr } from 'pages/InstallKeplr'
import { enableKeplr, walletStore } from 'store'

import { Spinner } from '@/molecules'

function AppContent() {
  const snap = useSnapshot(walletStore)

  switch (snap.keplrStatus) {
    case 'loading':
      return <Spinner />
    case 'ready':
      return <Routes />
    case 'uninstalled':
    default:
      return <InstallKeplr />
  }
}

export default function App() {
  const theme = useAppTheme()

  window.onload = () => {
    enableKeplr()
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  )
}
