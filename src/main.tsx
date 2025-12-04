import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/QueryClient.ts'
import { UnitsProvider } from './components/UnitsProvider/UnitsProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UnitsProvider>
        <App />
      </UnitsProvider>
    </QueryClientProvider>
  </StrictMode>,
)
