import React, { useState } from 'react'
import { GraphqlRequestContext } from 'graphqlRequestContext'
import { GraphQLClient } from 'graphql-request'

const { VITE_INDEXER_GRAPHQL_API } = import.meta.env

export const GraphqlProvider = ({ children }: { children?: React.ReactNode }) => {
  const [client, setClient] = useState<GraphQLClient | undefined>(undefined)
  if (!client) {
    setClient(
      new GraphQLClient(
        VITE_INDEXER_GRAPHQL_API || 'http://localhost:5000/indexer/graphql',
      ),
    )
  }
  return (
    <GraphqlRequestContext.Provider value={{ client }}>
      {children}
    </GraphqlRequestContext.Provider>
  )
}
