import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './store/AuthContext.jsx'
import { AppointmentProvider } from './store/AppointmentContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <AppointmentProvider>
          <App />
      </AppointmentProvider>
    </StrictMode>
  </AuthProvider>
    
)
