import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { UserProvider, UsersProvider } from './components/contexts.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <UserProvider>
        <UsersProvider>
          <BrowserRouter>
            <CssBaseline />
            <App />
          </BrowserRouter>
        </UsersProvider>
      </UserProvider>
    </>
    
  </React.StrictMode>,
)
