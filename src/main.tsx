import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './codes/styles/globals.css'
import App from './codes/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
