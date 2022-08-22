import { useMemo } from 'react'
import { createTheme, responsiveFontSizes, useMediaQuery } from '@mui/material'

export function useAppTheme() {
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
    [prefersDarkMode], // eslint-disable-line
  )
  return theme
}
