import { withRouter } from 'storybook-addon-react-router-v6'
import { theme } from '@chakra-ui/react'

export const decorators = [withRouter]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  chakra: {
    theme,
  },
}
