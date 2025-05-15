import { Suspense, lazy } from "react";
import "./utils/i18n"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from './utils/AuthContext';
import { PagePredictor } from "./utils/PagePredictor";
import Header from "./components/Header/Header";

const Home = lazy(() => import(/* webpackChunkName: "home" */ "./components/Home/Home"));
const Security = lazy(() => import(/* webpackChunkName: "security" */ "./components/Security/Security"));
const Profile = lazy(() => import(/* webpackChunkName: "profile" */ "./components/Profiles/Profile"));
const ProfileSetting = lazy(() => import(/* webpackChunkName: "settings" */ "./components/ProfileSetting/ProfileSetting"));
const VacancyCreator = lazy(() => import(/* webpackChunkName: "create" */ "./components/VacancyCreator/VacancyCreator"));
const Catalog = lazy(() => import(/* webpackChunkName: "catalog" */ "./components/Catalog/Catalog"));
const Position = lazy(() => import(/* webpackChunkName: "position" */ "./components/Position/Position"));
const VideoChat = lazy(() => import(/* webpackChunkName: "videoChat" */ "./components/VideoChat/VideoChat"));
const ErrorPage = lazy(() => import("./components/404Error/404Error"));

function App() {
  return (
      <AuthProvider>
          <Router>
              <div className="App">
                  <PagePredictor>
                  <Header />
                      <Suspense fallback={<div>Loading...</div>}>
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
                      </Suspense>
                      </PagePredictor>
              </div>
          </Router>
      </AuthProvider>
  );
}

export default App;