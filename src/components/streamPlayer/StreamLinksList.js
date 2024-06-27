import "../../styles/streamPlayerModal.css";
import CloseLogo from "../logos/CloseLogo";
import { useState, useEffect } from "react";

export default function StreamLinksList({ isVisible, urls, onLinkClick, onCloseClick }) {
    const [streamLinksList, setStreamLinksList] = useState([]);

    useEffect(() => {
        if (urls && streamLinksList.length === 0) {
            setStreamLinksList(buildStreamLinksList(urls));
        } else {
            const selectedIndex = streamLinksList.findIndex(streamLink => streamLink.selected);
            const updatedStreamLinksList = buildStreamLinksList(urls, selectedIndex);
            setStreamLinksList(updatedStreamLinksList);
        }
    }, [urls]);

    const handleLinkClick = (index, url) => {
        const updatedStreamLinksList = buildStreamLinksList(streamLinksList.map(streamLink => streamLink.url), index);
        setStreamLinksList(updatedStreamLinksList);

        setTimeout(() => onLinkClick(url), 300);
    }

    const buildStreamLinksList = (links, selectedIndex) => {
        if (!links || links.length === 0)
            return [];

        const newList = links.map(link => {
            return {
                url: link,
                selected: false
            }
        });

        selectedIndex = selectedIndex ?? 0;
        newList[selectedIndex].selected = true;

        return newList;
    }

    return <div className={`stream-links-list-container ${isVisible ? "visible" : ""}`}>
        <div className="header">
            <div>Available Links</div>
            <div className="action-logo" onClick={() => onCloseClick()}><CloseLogo /></div>

        </div>
        <div className="stream-links-list">
            {streamLinksList.map((streamLink, i) =>
                <StreamLink
                    key={i}
                    index={i}
                    url={streamLink.url}
                    selected={streamLink.selected}
                    onClick={() => handleLinkClick(i, streamLink.url)} />)}
        </div>
    </div>
}


function StreamLink({ index, url, selected, onClick }) {
    const urlObject = new URL(url);
    const domainName = urlObject.hostname;
    return <div className={`stream-link ${selected ? "selected" : ""}`} onClick={() => onClick()}>
        <div>Link {index}</div>
        <div className="domain-source">{domainName}</div>
    </div>
}