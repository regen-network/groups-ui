import React, { useState } from 'react'
import { GraphQLClient } from 'graphql-request'
import { GraphqlRequestContext } from 'graphql-request-context'
import { useSnapshot } from 'valtio'

import { Chain } from './store/chain.store'

export const GraphqlProvider = ({ children }: { children?: React.ReactNode }) => {
  const { active } = useSnapshot(Chain)
  const [client, setClient] = useState<GraphQLClient | undefined>(undefined)
  if (!client) {
    setClient(
      new GraphQLClient(active.indexer || 'http://localhost:5000/indexer/graphql'),
    )
  }
  return (
    <GraphqlRequestContext.Provider value={{ client }}>
      {children}
    </GraphqlRequestContext.Provider>
  )
}
