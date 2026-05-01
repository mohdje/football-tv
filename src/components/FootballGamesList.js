import "../styles/footballgameslist.css";
import { useRef, useEffect } from 'react';

export default function FootballGamesList({ macthesContainersList, onMatchClick }) {

    const containerRef = useRef(null);

    useEffect(() => {
        const leagueCard = document.getElementsByClassName("football-games-league")[0];
        const container = containerRef.current;
        if (container && leagueCard) {
            const cardsPerRow = Math.floor(container.clientWidth / leagueCard.clientWidth);
            const totalCardsWidth = cardsPerRow * (leagueCard.clientWidth + 10); // 10px is the gap between cards
            const remainingSpace = container.clientWidth - totalCardsWidth;
            container.style.marginLeft = `${remainingSpace / 2}px`;
            container.style.marginRight = `${remainingSpace / 2}px`;
        }
    }, []);


    return (
        <div ref={containerRef} className="football-games-leagues-container">
            {macthesContainersList.map(container => {
                return (
                    <div key={container.league.name} className="football-games-league">
                        <div className="header">
                            <div className="football-league">
                                <img className="logo" src={container.league.logo} alt=""></img>
                                <div className="name">{container.league.name}</div>
                            </div>
                            <div className="journey">{container.league.journey}</div>
                        </div>

                        {container.matches.map((match, index) => <MatchInfo key={index} match={match} onClick={() => onMatchClick(match)} />)}
                    </div>
                );
            })}
        </div>
    );
}

function MatchInfo({ match, onClick }) {

    const getFormattedTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    return (
        <div>
            <div className="match-container" onClick={() => onClick()}>
                <div className="team home">
                    <div className="name">{match.homeTeam.name}</div>
                    <img src={match.homeTeam.logo} alt=""></img>
                </div>
                <div>
                    <div>{getFormattedTime(match.startDateTime)}</div>
                    <div>vs</div>
                </div>
                <div className="team visitor">
                    <img src={match.awayTeam.logo} alt=""></img>
                    <div className="name">{match.awayTeam.name}</div>
                </div>
            </div>
        </div>
    );
}
