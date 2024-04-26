import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// import './login.css'
import App from './App'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import '@fontsource/dm-sans'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { BrowserRouter } from 'react-router-dom'

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

ReactDOM.render(

  <React.StrictMode>
    {/* <Authenticator.Provider > */}
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    {/* </Authenticator.Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
)


