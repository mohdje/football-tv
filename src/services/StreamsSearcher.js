import { getHtmlDocument } from "./CorsProxy";
import { getTotalSportekStreamsUrl } from "./streamSearchers/TotalSportekStreamsSearcher";
import { getSportsBayStreamsUrl } from "./streamSearchers/SportsbayStreamsSearcher";

export async function searchMatchStreamsAsync(match, onStreamsFound, onNoStreamFound) {
    const promises = [
        getSportsBayStreamsUrl(match),
        getTotalSportekStreamsUrl(match)];

    let foundStreams = false;
    const searchStreamPromise = async (promise) => {
        const urls = await promise;
        if (urls?.length > 0) {
            onStreamsFound(urls);
            foundStreams = true;
        }
    }

    await Promise.all(promises.map(promise => searchStreamPromise(promise)));

    if (!foundStreams)
        onNoStreamFound();
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


async function getRedditSportbuffStreamsLinks(match) {
    const url = "https://reddit11.sportshub.stream";
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
