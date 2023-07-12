import React from 'react'
import { createRoot } from 'react-dom/client'
import { ReactQueryProvider } from 'react-query-provider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'theme'

import App from './App'

import './main.css'

const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)

root.render(
  <React.StrictMode>
    <ReactQueryProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ReactQueryProvider>
  </React.StrictMode>,
)
