import { useMemo } from 'react'
import {
  type ThemeOptions,
  createTheme,
  responsiveFontSizes,
  useMediaQuery,
} from '@mui/material'

const defaultFontFamily = ['"Lato"', '-apple-system', 'sans-serif'].join(',')
const headerFontFamily = ['"Muli"', '-apple-system', 'sans-serif'].join(',')

const headerDefaults = {
  fontFamily: headerFontFamily,
  fontWeight: 900,
  letterSpacing: 1,
}

const baseTheme: ThemeOptions = {
  typography: {
    fontFamily: defaultFontFamily,
    h1: {
      ...headerDefaults,
      fontSize: 48,
    },
    h2: {
      ...headerDefaults,
      fontSize: 38,
    },
    h3: {
      ...headerDefaults,
      fontSize: 32,
    },
    h4: {
      ...headerDefaults,
      fontSize: 24,
    },
    h5: {
      ...headerDefaults,
      fontSize: 21,
    },
  },
}

export function useAppTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
          typography: {
            fontFamily: defaultFontFamily,
            h1: {
              ...headerDefaults,
              fontSize: 48,
            },
            h2: {
              ...headerDefaults,
              fontSize: 38,
            },
            h3: {
              ...headerDefaults,
              fontSize: 32,
            },
            h4: {
              ...headerDefaults,
              fontSize: 24,
            },
            h5: {
              ...headerDefaults,
              fontSize: 21,
            },
          },
        }),
      ),
    [prefersDarkMode], // eslint-disable-line
  )
  return theme
}
