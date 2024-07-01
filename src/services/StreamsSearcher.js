import { getHtmlDocument } from "./CorsProxy";
import { getTotalSportekStreamsUrls } from "./streamSearchers/TotalSportekStreamsSearcher";
import { getSportsBayStreamsUrls } from "./streamSearchers/SportsbayStreamsSearcher";
import { getDldhStreamsUrls } from "./streamSearchers/DlhdStreamSearcher";

export async function searchMatchStreamsAsync(match, onStreamsFound, onNoStreamFound) {
    const promises = [
        getSportsBayStreamsUrls(match),
        getTotalSportekStreamsUrls(match),
        getDldhStreamsUrls(match)];

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


