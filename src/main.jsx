import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Import all legacy CSS files to preserve perfect styling
import './assets/css/style.css'
import './assets/css/dropdowns.css'
import './assets/css/chat.css'
import './assets/css/interactive.css'
import './assets/css/landing.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
