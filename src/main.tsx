import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import AppContext from './Context/AppContext'
import { ReactQueryProvider } from './providers/ReactQueryProvider'
import Routes from './Router/Routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <AppContext>
        <RouterProvider router={Routes} />
      </AppContext>
    </ReactQueryProvider>
  </StrictMode>
)
