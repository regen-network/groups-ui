import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://127.0.0.1:5000/indexer/v1/graphql',
  documents: ['src/graphql/indexer/**/*.graphql'],
  generates: {
    './src/gql/': {
      preset: 'client',
      presetConfig: { fragmentMasking: { unmaskFunctionName: 'getFragmentData' } },
    },
  },
}

export default config
