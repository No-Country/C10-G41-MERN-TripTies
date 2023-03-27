import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path:"/home",
    element: <Home/>
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
