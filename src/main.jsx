import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './store/AuthContext.jsx'
import { AppointmentProvider } from './store/AppointmentContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'leaflet/dist/leaflet.css'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // ← 5 mins — hindi mag-refetch sa loob ng 5 mins
      retry: 1,                   // ← 1 retry lang kapag nag-error
      refetchOnWindowFocus: false // ← hindi mag-refetch kapag nag-switch ng browser tab
    }
  }
});

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AppointmentProvider>
          <Toaster position='bottom-right'/>
          <App />
        </AppointmentProvider>
      </QueryClientProvider>
    </StrictMode>
  </AuthProvider>
)