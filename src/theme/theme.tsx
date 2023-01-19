import type { ReactNode } from 'react'
import { type ThemeConfig, ChakraProvider, extendTheme } from '@chakra-ui/react'
import { StepsTheme as Steps } from 'chakra-ui-steps'

import { ButtonStyles as Button } from './components/button-theme'
import { HeadingStyles as Heading } from './components/heading-theme'

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
