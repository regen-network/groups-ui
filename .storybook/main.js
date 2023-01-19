// @ts-check
const tsconfigPaths = require('vite-tsconfig-paths').default

/** @type {import('@storybook/builder-vite').StorybookViteConfig} */
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    'storybook-addon-react-router-v6',
    // '@chakra-ui/storybook-addon', // TODO: Add this back in when it's fixed
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  core: {},
  features: {
    emotionAlias: false,
  },
}
