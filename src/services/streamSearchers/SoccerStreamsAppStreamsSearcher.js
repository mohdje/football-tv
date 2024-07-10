import { getHtmlDocument } from "../CorsProxy";

export async function getSoccerStreamAppStreamsUrls(match) {
    const link = await getStreamPageLink(match);

    if (!link)
        return null;

    const streamPage = await getHtmlDocument(link);

    if (!streamPage)
        return null;

    return getStreams(streamPage);
}


async function getStreamPageLink(match) {
    const url = "https://soccerstreams.app/schedule";

    const page = await getHtmlDocument(url);

    if (page) {
        const linkElements = page.querySelectorAll("a.team-name");
        for (let i = 0; i < linkElements.length; i++) {
            const linkElement = linkElements[i];
            const teamName = linkElement.querySelector("span")?.innerText.toLowerCase().trim();
            if (match.homeTeam.name.toLowerCase() === teamName || match.awayTeam.name.toLowerCase() === teamName)
                return linkElement.href;
        }
    }
}

function getStreams(htmlDocument) {
    const btnElements = htmlDocument.querySelectorAll("button.btn.btn-primary.btn.embed-link.pr-2");
    const streams = [];
    for (let i = 0; i < btnElements.length; i++) {
        const btnElement = btnElements[i];
        streams.push({
            url: btnElement.getAttribute('datatype'),
            channel: `SoccerStreams ${i + 1}`
        })
    }

    return streams;
}

