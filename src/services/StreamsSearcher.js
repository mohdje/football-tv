import { getHtmlDocument } from "./CorsProxy";

export async function getStreamsLinks(match) {

    const promises = [
        getSoccerStreamsAppLinks(match),
        getOlympicStreamsLinks(match),
        getRedditSportbuffStreamsLinks(match),
        getFootybiteStreamsLinks(match),
        getTotalSportekStreamsLinks(match)];

    const links = await Promise.all(promises);

    return links.filter(link => Boolean(link));
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

async function getRedditSportbuffStreamsLinks(match) {
    const url = "https://reddit.sportsbuff.stream/";
    const htmlDocument = await getHtmlDocument(url);

    const translateFromCyrillic = (cyrillicString) => {
        const cyrillicMap = {
            "і": "i", "о": "o", "е": "e", "а": "a"
        };

        let latinString = '';
        for (let char of cyrillicString) {
            latinString += cyrillicMap[char] || char; // Use original character if no mapping found
        }
        return latinString;
    }

    if (htmlDocument) {
        const linkElements = htmlDocument.querySelectorAll("a.item-event");

        for (let i = 0; i < linkElements.length; i++) {
            const linkElement = linkElements[i];
            const teamsNames = translateFromCyrillic(linkElement.innerText?.toLowerCase().trim());

            if (teamsNames.includes(match.homeTeam.name.toLowerCase()) || teamsNames.includes(match.awayTeam.name.toLowerCase())) {
                return linkElement.href;
            }
        }
    }
}

async function getFootybiteStreamsLinks(match) {
    const baseUrl = "https://back.footybite.com";
    const page = await getHtmlDocument(baseUrl);

    if (page) {
        const linkElements = page.querySelectorAll("a");
        for (let i = 0; i < linkElements.length; i++) {
            const linkElement = linkElements[i];
            const teamsNames = linkElement.title?.toLowerCase().trim();

            if (teamsNames.includes(match.homeTeam.name.toLowerCase()) || teamsNames.includes(match.awayTeam.name.toLowerCase())) {
                return linkElement.href;
            }
        }
    }
}

async function getTotalSportekStreamsLinks(match) {
    const baseUrl = "https://totalsportek.pro";
    const page = await getHtmlDocument(baseUrl);

    if (page) {
        const linkElements = page.querySelectorAll("a");
        for (let i = 0; i < linkElements.length; i++) {
            const linkElement = linkElements[i];
            const teamsNames = linkElement.innerText?.toLowerCase().trim();

            if (teamsNames.includes(match.homeTeam.name.toLowerCase()) || teamsNames.includes(match.awayTeam.name.toLowerCase())) {
                return linkElement.href;
            }
        }
    }
}

