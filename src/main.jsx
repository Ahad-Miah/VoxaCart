import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Router from './Router/Router'
import AuthProvider from './Provider/Authprovider/AuthProvider'
import { ToastContainer } from 'react-toastify'




createRoot(document.getElementById('root')).render(
 <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
          <ToastContainer position='top-right'></ToastContainer>
  </StrictMode>
)
