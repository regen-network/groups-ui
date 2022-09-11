import { type ThemeConfig, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'

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
