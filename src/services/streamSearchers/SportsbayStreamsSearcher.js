import { getCountryNameTranslation } from "../RestApiCountries";
import { getHtmlDocument } from "../CorsProxy";

export async function getSportsBayStreamsUrls(match) {
    const baseUrl = "https://sportsbay.dk";
    const page = await getHtmlDocument(baseUrl);

    const homeTeamName = await getCountryNameTranslation(match.homeTeam.name, "spa") ?? match.homeTeam.name;
    const awayTeamName = await getCountryNameTranslation(match.awayTeam.name, "spa") ?? match.awayTeam.name;

    const streamPageUrl = getSportsBayStreamPageLink(page, homeTeamName, awayTeamName);

    if (streamPageUrl) {
        const streamPage = await getHtmlDocument(`${baseUrl}${streamPageUrl}`);
        return getStreamUrls(streamPage);
    }

    return null;
}

function getSportsBayStreamPageLink(page, homeTeamName, awayTeamName) {
    if (page) {
        const linkElements = page.querySelectorAll("a");
        for (let i = 0; i < linkElements.length; i++) {
            const linkElement = linkElements[i];
            const teamsNames = linkElement.innerText?.toLowerCase().trim();

            if (teamsNames.includes(homeTeamName.toLowerCase()) || teamsNames.includes(awayTeamName.toLowerCase())) {
                return new URL(linkElement.href).pathname;
            }
        }
    }
}

function getStreamUrls(streamPage) {

    if (streamPage?.scripts) {
        for (let i = 0; i < streamPage.scripts.length; i++) {
            const script = streamPage.scripts[i];
            if (script.text.includes("var videos")) {
                const regexPattern = /var videos =(.*)\s*\$/;
                const matchResult = script.text.match(regexPattern);

                if (matchResult && matchResult[1]) {
                    const data = JSON.parse(matchResult[1].trim().replace(",]};", "]}"));
                    if (data?.SUB) {
                        return data.SUB.map(stream => {
                            return {
                                url: stream.code,
                                channel: stream.server
                            }
                        });
                    }
                }
            }
        }

    }

    return null;
}
