import { type ThemeConfig, extendTheme } from '@chakra-ui/react'
import { StepsStyleConfig as Steps } from 'chakra-ui-steps'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

export const theme = extendTheme({ config, components: { Steps } })
