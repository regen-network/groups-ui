import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from 'routes'
import { theme } from 'theme/theme'

import App from './App'

import './main.css'

const queryClient = new QueryClient()
const container = document.getElementById('root')
const root = createRoot(container as HTMLElement)

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
        {/* <BrowserRouter> */}
        <App />
        {/* </BrowserRouter> */}
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
