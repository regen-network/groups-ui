import type { ReactNode } from 'react'
import { type ThemeConfig, ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsTheme as Steps } from 'chakra-ui-steps'

import { Button } from './components/button-styles'
import { Heading } from './components/heading-styles'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config: config,
  components: { Steps, Heading, Button },
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)
