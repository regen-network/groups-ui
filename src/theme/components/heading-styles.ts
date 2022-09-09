import type { ComponentStyleConfig } from '@chakra-ui/theme'

export const Heading: ComponentStyleConfig = {
  baseStyle: {
    letterSpacing: '1px',
    fontFamily: '"Mulish", -apple-system, sans-serif',
    fontWeight: 900,
  },
  variants: {
    label: {
      textTransform: 'uppercase',
      letterSpacing: '1px',
      fontWeight: 800,
    },
  },
}
