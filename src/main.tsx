import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App'

import './main.css'

const container = document.getElementById('root')
const root = createRoot(container!) // eslint-disable-line @typescript-eslint/no-non-null-assertion

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
