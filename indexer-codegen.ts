import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:5000/indexer/graphql',
  documents: ['src/graphql/indexer/**/*.graphql'],
  generates: {
    './src/gql/': {
      preset: 'client',
    },
  },
}

export default config
