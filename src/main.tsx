import React from 'react'
import { createRoot } from 'react-dom/client'
import { ReactQueryProvider } from 'react-query-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'theme'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from 'clients/apolloClient'

import App from './App'

import './main.css'

const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)

root.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ApolloProvider client={apolloClient}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </ReactQueryProvider>
  </React.StrictMode>,
)
