import type { ReactNode } from 'react'
import { ChakraProvider, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { StepsTheme as Steps } from 'chakra-ui-steps'

import { ButtonStyles as Button } from './components/button-theme'
import { HeadingTheme as Heading } from './components/heading-theme'
import { TrTheme as Tr } from './components/table-theme'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

export const theme = extendTheme({
  config: config,
  components: { Steps, Heading, Button, Tr },
})

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)
