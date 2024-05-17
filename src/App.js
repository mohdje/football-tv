import AppLogo from "./components/logos/AppLogo.js";
import GithubLogo from "./components/logos/GithubLogo.js";
import AppContent from "./components/AppContent.js";
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="App-Header">
        <div className="logo-container">
          <AppLogo />
        </div>
      </div>
      <AppContent />
      <div className="App-Footer">
        <div>Feel free to contribute</div>
        <a href="https://github.com/mohdje/football-tv" target="_blank">
          <div className="logo-container">
            <GithubLogo />
          </div>
        </a>
      </div>
    </div>
  );
}

export default App;

