import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './hooks/userDetails.tsx';
import { BlogContextProvider } from './hooks/readBlog.tsx';
import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BlogContextProvider>
          <App />
        </BlogContextProvider>
      </UserProvider>
    </QueryClientProvider>
   </BrowserRouter>
  </StrictMode>,
)
