// import { withRouter } from 'storybook-addon-react-router-v6'
import { theme, ThemeProvider } from '../src/theme'

export const decorators = [
  // withRouter,
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
]

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
