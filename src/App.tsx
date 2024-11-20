import Security from './components/Security/Security';
import Header from './components/Header/Header';
import ProfileEmployee from "./components/Profiles/Employee/ProfileEmployee";
import  "./App.scss"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProfileHR from "./components/Profiles/HR/ProfileHR";

function App() {
  return (
      <Router>
    <div className="App">
      <Header />
        <Routes>
            <Route path="/login" element={<Security />} />
            <Route path="/profile/employee" element={<ProfileEmployee />} />
            <Route path="/profile/hr" element={<ProfileHR />} />
        </Routes>
    </div>
      </Router>
  );
}

export default App;