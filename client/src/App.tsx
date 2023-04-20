import LandingPage from "./components/LandingPage/LandingPage";
import "./App.css";
import axios from "axios";

axios.defaults.baseURL = process.env.BASEURL || "http://localhost:3000/api/v1";

function App(): JSX.Element {
  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
