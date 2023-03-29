import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Log from './components/Log/Log';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Contact from './components/Contact/Contact';
import AboutUs from './components/AboutUs/AboutUs';
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
  {
    path:"/login",
    element: <Log/>
  },
  {
    path:"/register",
    element: <Register/>
  },
  {
    path:"/contact",
    element: <Contact />
  },
  {
    path:"/about",
    element: <AboutUs />
  }

])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
