import Security from './components/Security/Security';
import Header from './components/Header/Header';
import ProfileEmployee from "./components/Profiles/Employee/ProfileEmployee";
import  "./App.scss"
import "./utils/i18n"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProfileHR from "./components/Profiles/HR/ProfileHR";
import Home from "./components/Home/Home";
import VacancyCreator from "./components/VacancyCreator/VacancyCreator";
import Error from "./components/404Error/404Error";
import Catalog from "./components/Catalog/Catalog";
import Profile from "./components/Profiles/Profile";
import VideoChat from "./components/VideoChat/VideoChat";

function App() {
  return (
      <Router>
    <div className="App">
      <Header />
        <Routes>
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Security />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/vacancy/create" element={<VacancyCreator />} />
            <Route path="/video-chat" element={<VideoChat />} />
            <Route path="/catalog" element={<Catalog />} />
        </Routes>
    </div>
      </Router>
  );
}

export default App;