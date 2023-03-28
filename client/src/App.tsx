import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home'
import './App.css'

function App(): JSX.Element {

  return (
    <div className="App">
      <LandingPage />
    </div>
  )
}

export default App
