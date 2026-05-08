import Spinner from "./logos/Spinner.js";
import { useState, useEffect } from "react";
import { getMatches, getStreams } from "../services/api.js";
import FootballGamesList from "./FootballGamesList.js";
import SearchModal from "./SearchModal.js";
import StreamPlayerModal from "./streamPlayer/StreamPlayerModal.js";
import ToastMessage from "./ToastMessage.js";

export default function AppContent() {
    const [macthesContainersList, setMacthesContainersList] = useState([]);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [searchingMatches, setSearchingMatches] = useState(false);

    const [matchStreams, setMatchStreams] = useState([]);
    const [showStreamPlayer, setShowStreamPlayer] = useState(false);

    const [showToastMessage, setShowToastMessage] = useState(false);


    useEffect(() => {
        setSearchingMatches(true);
        const fetchData = async () => {
            const result = await getMatches();
            if (result)
                setMacthesContainersList(result);

            setSearchingMatches(false);
        }
        fetchData();
    }, []);


    const handleMatchClick = async (match) => {
        setSearchModalVisible(true);

        const streams = await getStreams(match.homeTeam.name, match.awayTeam.name);
        if (streams && streams.length > 0) {
            setMatchStreams(streams);
            setSearchModalVisible(false);
            setShowStreamPlayer(true);
            return;
        }
        else {
            setSearchModalVisible(false);
            setShowToastMessage(true);
            setTimeout(() => {
                setShowToastMessage(false);
            }, 3000);
        }

        // await searchMatchStreamsAsync(match, (newStreams) => {
        //     newStreams = newStreams.filter(newStream => !matchStreamsRef.current.find(stream => stream.url === newStream.url));

        //     const updateStreamUrlsList = [...matchStreamsRef.current, ...newStreams];
        //     matchStreamsRef.current = updateStreamUrlsList

        //     setMatchStreams(updateStreamUrlsList);

        //     if (!showStreamPlayer || searchModalVisible) {
        //         setSearchModalVisible(false);
        //         setShowStreamPlayer(true);
        //     }
        // }, () => {
        //     setSearchModalVisible(false);
        //     setShowToastMessage(true);
        //     setTimeout(() => {
        //         setShowToastMessage(false);
        //     }, 3000);
        // })
    }

    let content = null
    if (searchingMatches) {
        content = (
            <div className="loading-area">
                <div>Searching for today's matches...</div>
                <div className="spinner-container">
                    <Spinner />
                </div>
            </div>);
    }
    else if (macthesContainersList?.length > 0) {
        content = <FootballGamesList macthesContainersList={macthesContainersList} onMatchClick={(match) => handleMatchClick(match)} />
    }
    else {
        content = <div>No football matches found for today</div>
    }


    return (
        <div className="App-Content">
            <div className="title">Today's matches</div>
            {content}
            <SearchModal isVisible={searchModalVisible} />
            <StreamPlayerModal isVisible={showStreamPlayer} streams={matchStreams} onOutsideClick={() => setShowStreamPlayer(false)} />
            <ToastMessage message={"No stream found"} isVisible={showToastMessage} />
        </div>)
}
