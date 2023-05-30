import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css";
import axios from "axios";

// axios.defaults.baseURL = "https://tripties.onrender.com/api/v1";
axios.defaults.baseURL = "http://localhost:3000/api/v1";

function App(): JSX.Element {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
