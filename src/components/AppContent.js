import Spinner from "./logos/Spinner.js";
import { useState, useEffect } from "react";
import { getTodaysMatches } from "../services/FootballEvents.js";
import { getStreamsLinks } from "../services/StreamsSearcher.js";
import FootballGamesList from "./FootballGamesList.js";
import SearchModal from "./SearchModal.js";

export default function AppContent() {
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
        const streamsLinks = await getStreamsLinks(match);

        const updatedMacthesContainersList = [...macthesContainersList];

        const matchToUpdate = updatedMacthesContainersList.flatMap(league => league.matches).find(m => m.id === match.id);
        matchToUpdate.streams = streamsLinks;

        setMacthesContainersList(updatedMacthesContainersList);
        setSearchModalVisible(false);
    }

    const content = () => {
        if (searchingMatches) {
            return (
                <div className="loading-area">
                    <div>Searching for today's matches...</div>
                    <div className="spinner-container">
                        <Spinner />
                    </div>
                </div>);
        }
        else if (macthesContainersList?.length > 0) {
            return <FootballGamesList macthesContainersList={macthesContainersList} onMatchClick={(match) => handleMatchClick(match)} />
        }
        else {
            return <div>No football matches found for today</div>
        }
    }

    return (
        <div className="App-Content">
            <div className="title">Today's matches</div>
            {content()}
            <SearchModal isVisible={searchModalVisible} />
        </div>)
}
