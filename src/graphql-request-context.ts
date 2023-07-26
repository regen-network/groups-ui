import { createContext, useContext } from 'react'
import { GraphQLClient } from 'graphql-request'

export const GraphqlRequestContext = createContext<{
  client: GraphQLClient | undefined
}>({ client: undefined })

export function useGraphQLClient() {
  return useContext(GraphqlRequestContext)
}
