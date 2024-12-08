import Security from './components/Security/Security';
import Header from './components/Header/Header';
import "./utils/i18n"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home";
import VacancyCreator from "./components/VacancyCreator/VacancyCreator";
import Catalog from "./components/Catalog/Catalog";
import Position from "./components/Position/Position";
import Profile from "./components/Profiles/Profile";
import VideoChat from "./components/VideoChat/VideoChat";
import { AuthProvider } from './utils/AuthContext';
import ProfileSetting from "./components/ProfileSetting/ProfileSetting";
import ErrorPage from "./components/404Error/404Error";

function App() {
  return (
      <AuthProvider>
          <Router>
              <div className="App">
                  <Header />
                  <Routes>
                      <Route path="*" element={<ErrorPage />} />
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Security />} />
                      <Route path="/profile/:id" element={<Profile />} />
                      <Route path="/profile/settings" element={<ProfileSetting />}/>
                      <Route path="/vacancy/create" element={<VacancyCreator />} />
                      <Route path="/catalog" element={<Catalog />} />
                      <Route path="/position/:vacancyId" element={<Position />} />
                      <Route path="/video-chat" element={<VideoChat />} />
                  </Routes>
              </div>
          </Router>
      </AuthProvider>
  );
}

export default App;