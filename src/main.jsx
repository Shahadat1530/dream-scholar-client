import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes.jsx'
import AuthProvider from './provider/AuthProvider.jsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <div className='max-w-screen-2xl mx-auto'>
          <RouterProvider router={router} />
        </div>
      </HelmetProvider>
    </AuthProvider>
  </StrictMode>,
)
