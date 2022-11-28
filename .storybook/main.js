// @ts-check
const tsconfigPaths = require('vite-tsconfig-paths').default

/** @type {import('@storybook/builder-vite').StorybookViteConfig} */
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions',
    '@chakra-ui/storybook-addon',
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
