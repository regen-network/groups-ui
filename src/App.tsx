import { useMemo } from 'react'
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import { Routes } from 'Routes'

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            // mode: prefersDarkMode ? 'dark' : 'light',
            mode: 'light',
          },
        }),
      ),
    [prefersDarkMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  )
}

export default App
