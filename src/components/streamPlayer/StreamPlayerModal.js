import ModalContainer from "../ModalContainer.js";
import EnterFullScreenLogo from "../logos/EnterFullScreenLogo.js";
import ExitFullScreenLogo from "../logos/ExitFullScreenLogo.js";
import ListLogo from "../logos/ListLogo.js";
import StreamLinksList from "./StreamLinksList.js";

import "../../styles/streamPlayerModal.css";
import { useEffect, useRef, useState } from "react";

export default function StreamPlayerModal({ streams, isVisible, onOutsideClick }) {
    if (isVisible) {
        const player = StreamPlayer({ streams: streams });
        return <ModalContainer content={player} onOutsideClick={() => onOutsideClick()} />
    }
    else
        return null
}

function StreamPlayer({ streams }) {
    const streamPlayerContainer = useRef(null);
    const [iframeSource, setIframeSource] = useState("");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isStreamLinksListVisible, setIsStreamLinksListVisible] = useState(false);

    useEffect(() => {
        if (!iframeSource) {
            setIframeSource(streams[0].url);
        }
    }, [streams]);

    const handleStreamLinkClick = (selectedStream) => {
        setIframeSource(selectedStream.url);
        setIsStreamLinksListVisible(false);
    }

    return <div ref={streamPlayerContainer} className="stream-player-container" >
        <div className="logo list" onClick={() => setIsStreamLinksListVisible(true)}>
            <ListLogo />
        </div>
        <StreamLinksList
            isVisible={isStreamLinksListVisible}
            streams={streams}
            onLinkClick={(stream) => handleStreamLinkClick(stream)}
            onCloseClick={() => setIsStreamLinksListVisible(false)} />

        <div className="logo full-screen" onClick={() => setIsFullScreen(toggleFullScreen(streamPlayerContainer.current))}>
            {isFullScreen ? <ExitFullScreenLogo /> : <EnterFullScreenLogo />}
        </div>
        <iframe title="stream-player-iframe" src={iframeSource} />
    </div>
}

function toggleFullScreen(elem) {
    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
        return true;
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
        }
        return false;
    }
}