import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import AppContext from './Context/AppContext.tsx'
import Routes from './Router/Routes.tsx'
// import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContext>
      <RouterProvider router={Routes}/>
    </AppContext>
  </StrictMode>
)
