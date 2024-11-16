import Security from './components/Security/Security';
import Header from './components/Header/Header';
import ProfileEmployee from "./components/Profiles/ProfileEmployee";
import  "./App.scss"

function App() {
  return (
    <div className="App">
      <Header />
        {/*<Security />*/}
        <ProfileEmployee />
    </div>
  );
}

export default App;