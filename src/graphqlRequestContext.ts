import { createContext, useContext } from 'react'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('http://localhost:5000/indexer/graphql')

const GraphqlRequestContext = createContext(client)

export function useGraphQLClient() {
  return useContext(GraphqlRequestContext)
}
