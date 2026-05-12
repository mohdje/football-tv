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
        <div>
          2026 - Football TV does not host any content, it just provides links to matches streaming. Football Tv does not have any commercial purpose.
        </div>
        <div>Feel free to contribute</div>
        <a href="https://github.com/mohdje/football-tv" target="_blank" rel="noopener noreferrer">
          <div className="logo-container">
            <GithubLogo />
          </div>
        </a>
      </div>
    </div>
  );
}

export default App;

