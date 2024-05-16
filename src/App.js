import { getTodaysMatches } from "./services/FootballEvents.js";
import { getStreams } from "./services/StreamsSearcher.js";
import FootballGamesList from "./components/FootballGamesList.js";
import SearchModal from "./components/SearchModal.js";
import AppLogo from "./components/logos/AppLogo.js";
import GithubLogo from "./components/logos/GithubLogo.js";
import Spinner from "./components/logos/Spinner.js";
import { useState, useEffect } from "react";
import './App.css';

function App() {
  const [macthesContainersList, setMacthesContainersList] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [searchingMatches, setSearchingMatches] = useState(false);

  useEffect(() => {
    setSearchingMatches(true);
    const fetchData = async () => {
      const result = await getTodaysMatches();
      if (result)
        setMacthesContainersList(result);

      setSearchingMatches(false);
    }
    fetchData();
  }, []);

  const handleMatchClick = async (match) => {
    setSearchModalVisible(true);
    const streams = await getStreams(match);

    const updatedMacthesContainersList = [...macthesContainersList];

    const matchToUpdate = updatedMacthesContainersList.flatMap(league => league.matches).find(m => m.id === match.id);
    matchToUpdate.streams = streams.filter(stream => Boolean(stream));

    setMacthesContainersList(updatedMacthesContainersList);
    setSearchModalVisible(false);
  }

  return (
    <div className="App">
      <div className="App-Header">
        <div className="logo-container">
          <AppLogo />
        </div>
      </div>
      <div className="App-Content">
        <div className="title">Today's matches</div>{
          searchingMatches ?
            (<div className="loading-area">
              <div>Searching for today's matches...</div>
              <div className="spinner-container">
                <Spinner />
              </div>
            </div>) : null
        }

        <FootballGamesList macthesContainersList={macthesContainersList} onMatchClick={(match) => handleMatchClick(match)} />
        <SearchModal isVisible={searchModalVisible} />
      </div>

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
