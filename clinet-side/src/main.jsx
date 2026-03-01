import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DarkModeContextProvider } from './context/DarkModeContext.jsx'
import { AuthContextProvider } from './context/authContext.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

   const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeContextProvider>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </AuthContextProvider>
    </DarkModeContextProvider>
  </StrictMode>
)
