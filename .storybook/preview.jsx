// import { withRouter } from 'storybook-addon-react-router-v6'
import { theme, ThemeProvider } from '../src/theme'
import { BrowserRouter as Router } from 'react-router-dom'

export const decorators = [
  // withRouter,
  (Story) => (
    <ThemeProvider>
      <Router>
        <Story />
      </Router>
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
