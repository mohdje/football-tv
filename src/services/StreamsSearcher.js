import { getHtmlDocument } from "./CorsProxy";

export async function getStreams(match) {
    const promises = [getSoccerStreamsAppLinks(match), getOlympicStreamsLinks(match)];

    return await Promise.all(promises);
}


async function getSoccerStreamsAppLinks(match) {
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

async function getOlympicStreamsLinks(match) {
    const baseUrl = "https://olympicstreams.co";
    const streamsUrl = `${baseUrl}/live/soccer-stream`;

    const page = await getHtmlDocument(streamsUrl);

    if (page) {
        const linkElements = page.querySelectorAll("a");
        for (let i = 0; i < linkElements.length; i++) {
            const linkElement = linkElements[i];
            const teamsNames = linkElement.title?.toLowerCase().trim();

            if (teamsNames.includes(match.homeTeam.name.toLowerCase()) || teamsNames.includes(match.awayTeam.name.toLowerCase())) {
                const urlElements = linkElement.href.split('/');
                return `${baseUrl}/${urlElements[urlElements.length - 1]}`;
            }
        }
    }
}