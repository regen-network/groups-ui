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
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:valtio/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended', // this should always be the last element in the array
  ],
  ignorePatterns: ['src/proto/**/*'],
  plugins: ['@typescript-eslint', 'simple-import-sort', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/accessible-emoji': 'off',
    'no-unused-vars': 'off',
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
          // absolute imports
          [
            '^(util|chains|stubs)(/.*|$)',
            '^(types)(/.*|$)',
            '^(hooks|store|constants)(/.*|$)',
          ],
          // Pages
          ['^(pages)(/.*|$)'],
          // components
          ['^(@)(/.*|$)'],
          // Relative imports
          ['^\\.'],
        ],
      },
    ],
  },
}
module.exports = eslintConfig
