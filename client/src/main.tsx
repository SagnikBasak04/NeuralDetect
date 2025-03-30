import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import "./index.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import { AuthContextProvider } from './context/AuthContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </StrictMode>,
)
