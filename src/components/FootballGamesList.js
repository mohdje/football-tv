import "../styles/footballgameslist.css";
import { useRef, useEffect, useState } from 'react';

export default function FootballGamesList({ macthesContainersList, onMatchClick }) {

    const containerRef = useRef(null);
    const [isOverflow, setIsOverflow] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", checkIsOverflow);
        return () => {
            window.removeEventListener("resize", checkIsOverflow);
        }
    }, []);


    useEffect(() => {
        checkIsOverflow();
    }, [macthesContainersList]);

    const checkIsOverflow = () => {
        const element = containerRef.current;
        setIsOverflow(element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth);
    }

    return (
        <div ref={containerRef} className="football-games-leagues-container" style={{ justifyContent: isOverflow ? "flex-start" : "center" }}>
            {macthesContainersList.map(container => {
                return (
                    <div key={container.league.name} className="football-games-league">
                        <div className="football-league">
                            <img className="logo" src={container.league.logo}></img>
                            <div className="name">{container.league.name}</div>
                        </div>

                        {container.matches.map((match, index) => <MatchInfo key={index} match={match} onClick={() => onMatchClick(match)} />)}
                    </div>
                );
            })}
        </div>
    );
}

function MatchInfo({ match, onClick }) {

    let streamLinks = "";
    if (match.streams && match.streams.length === 0)
        streamLinks = <div>No streams found</div>
    else
        streamLinks = match.streams?.map((stream, index) => <a href={stream} key={index} target="_blank">Link {index}</a>)

    return (
        <div>
            <div className="match-container" onClick={() => onClick()}>
                <div className="team home">
                    <div>{match.homeTeam.name}</div>
                    <img src={match.homeTeam.logo}></img>
                </div>
                <div>vs</div>
                <div className="team visitor">
                    <img src={match.awayTeam.logo}></img>
                    <div>{match.awayTeam.name}</div>
                </div>
            </div>
            <div className="links-container">
                {streamLinks}
            </div>
        </div>
    );
}
