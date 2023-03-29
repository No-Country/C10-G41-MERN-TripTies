import LandingPage from './components/LandingPage/LandingPage'
import './App.css'
import axios from "axios";

axios.defaults.baseURL = ""

function App(): JSX.Element {

  return (
    <div className="App">
      <LandingPage />
    </div>
  )
}

export default App
