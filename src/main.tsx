import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { createTheme } from '@mui/material'
import './index.css'

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      warning: string
      error: string
      success: string
    }
  }

  interface ThemeOptions {
    status?: {
      warning?: string
      error?: string
      success?: string
    }
  }
}
const theme = createTheme({
  typography: {
    fontFamily: 'DM Sans',
    allVariants: {
      color: 'rgba(0, 0, 0, 0.60)',
    },
  },

  status: {
    warning: '#e53e3e',
    error: '#ef5350',
  },

  palette: {
    primary: {
      main: '#6564DB',
    },
    secondary: {
      main: '#fcb900',
    },
    info: {
      main: '#6564DB',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <BrowserRouter>
        <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
