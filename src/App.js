import { Helmet } from 'react-helmet-async';
import AppLogo from "./components/logos/AppLogo.js";
import GithubLogo from "./components/logos/GithubLogo.js";
import AppContent from "./components/AppContent.js";
import './App.css';

function App() {
  return (
    <>
      <Helmet>
        <title>Football TV - Stream Live Football Matches Online</title>
        <meta name="description" content="Football TV - Stream live football matches from major leagues. Watch any football game online from popular streaming sources without annoying ads." />
        <meta property="og:title" content="Football TV - Stream Live Football Matches Online" />
        <meta property="og:description" content="Watch live football matches from major leagues without ads. Stream Premier League, La Liga, Serie A, Bundesliga and more." />
        <link rel="canonical" href="https://football-tv.vercel.app" />
      </Helmet>
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
    </>
  );
}

export default App;

