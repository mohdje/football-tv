import "../../styles/streamPlayerModal.css";
import CloseLogo from "../logos/CloseLogo";
import { useState, useEffect } from "react";

export default function StreamLinksList({ isVisible, streams, onLinkClick, onCloseClick }) {
    const [streamLinksList, setStreamLinksList] = useState([]);

    useEffect(() => {
        if (streams && streamLinksList.length === 0) {
            setStreamLinksList(buildStreamLinksList(streams));
        } else {
            const selectedIndex = streamLinksList.findIndex(streamLink => streamLink.selected);
            const updatedStreamLinksList = buildStreamLinksList(streams, selectedIndex);
            setStreamLinksList(updatedStreamLinksList);
        }
    }, [streams]);

    const handleLinkClick = (index, selectedStream) => {
        const updatedStreamLinksList = buildStreamLinksList(streamLinksList, index);
        setStreamLinksList(updatedStreamLinksList);

        setTimeout(() => onLinkClick(selectedStream), 300);
    }

    const buildStreamLinksList = (streams, selectedIndex) => {
        if (!streams || streams.length === 0)
            return [];

        const newList = streams.map(stream => {
            return {
                url: stream.url,
                channel: stream.channel,
                selected: false
            }
        });

        selectedIndex = selectedIndex ?? 0;
        newList[selectedIndex].selected = true;

        return newList;
    }

    return <div className={`stream-links-list-container ${isVisible ? "visible" : ""}`}>
        <div className="header">
            <div>Available Channels</div>
            <div className="action-logo" onClick={() => onCloseClick()}><CloseLogo /></div>

        </div>
        <div className="stream-links-list">
            {streamLinksList.map((streamLink, i) =>
                <StreamLink
                    key={i}
                    url={streamLink.url}
                    channel={streamLink.channel}
                    selected={streamLink.selected}
                    onClick={() => handleLinkClick(i, streamLink)} />)}
        </div>
    </div>
}


function StreamLink({ channel, selected, onClick }) {
    return <div className={`stream-link ${selected ? "selected" : ""}`} onClick={() => onClick()}>
        <div className="channel-name">{channel}</div>
    </div>
}