import { type ReactNode, useMemo } from 'react'
import {
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material'
import blue from '@mui/material/colors/blue'
import indigo from '@mui/material/colors/indigo'
import lightGreen from '@mui/material/colors/lightGreen'

const defaultFontFamily = ['"Lato"', '-apple-system', 'sans-serif'].join(',')
const headerFontFamily = ['"Muli"', '-apple-system', 'sans-serif'].join(',')

const headerDefaults = {
  fontFamily: headerFontFamily,
  fontWeight: 900,
  letterSpacing: 1,
}

export const Theme = (props: { children: ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme({
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
            primary: prefersDarkMode ? lightGreen : indigo,
            secondary: blue,
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
            h6: {
              ...headerDefaults,
              fontWeight: 800,
              fontSize: 18,
            },
          },
          components: {
            MuiButton: {
              defaultProps: {
                variant: 'contained',
              },
            },
            MuiLink: {
              defaultProps: {
                underline: 'hover',
              },
            },
          },
        }),
      ),
    [prefersDarkMode], // eslint-disable-line
  )
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  )
}
