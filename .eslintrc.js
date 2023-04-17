// @ts-check

/** @type {import('eslint').Linter.Config} */
const eslintConfig = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'plugin:storybook/recommended',
    'plugin:jsx-a11y/recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:valtio/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended', // this should always be the last element in the array
  ],
  ignorePatterns: ['src/proto/**/*'],
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import',
    'simple-import-sort',
    'prettier',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      { endOfLine: 'auto' },
      {
        usePrettierrc: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'no-unused-vars': 'off',
    'import/no-duplicates': 'error',
    'import/no-unresolved': 'error',
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'simple-import-sort/exports': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        // specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Packages. `react` related packages come first.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          ['^react', '^@?\\w'],
          // absolute imports - types/util, then data-related
          ['^(types)', '^(util)(/.*|$)'],
          ['^(api|store|hooks|routes)', '^(api|store|hooks|routes)(/.*|$)'], // (repeating is due to a bug importing types)
          // Pages, components
          ['^(pages)(/.*|$)', '^(@)(/.*|$)'],
          // Parent imports. Put `..` last.
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports. Put same-folder imports and `.` last.
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // assets
          ['^(assets)(/.*|$)'],
        ],
      },
    ],
  },
}
module.exports = eslintConfig
