import { getHtmlDocument } from "../CorsProxy";

export async function getTotalSportekStreamsUrls(match) {
    const baseUrl = "https://totalsportek.pro";
    const page = await getHtmlDocument(baseUrl);

    const streamLinksPageUrl = getTotalSportekStreamsLinksPageUrl(page, match);

    if (!streamLinksPageUrl)
        return null;

    const streamLinksPage = await getHtmlDocument(streamLinksPageUrl);
    const streamPageUrls = getTotalSportekStreamPageUrls(streamLinksPage);

    if (!streamPageUrls || streamPageUrls.length === 0)
        return null;

    const promises = streamPageUrls.map(url => getIframeStreamUrl(url));
    const streamUrls = await Promise.all(promises);

    return streamUrls.filter(link => Boolean(link));
}


function getTotalSportekStreamsLinksPageUrl(htmlDocument, match) {
    if (htmlDocument) {
        const linkElements = htmlDocument.querySelectorAll("a");
        for (let i = 0; i < linkElements.length; i++) {
            const linkElement = linkElements[i];
            const teamsNames = linkElement.innerText?.toLowerCase().trim();

            if (teamsNames.includes(match.homeTeam.name.toLowerCase()) || teamsNames.includes(match.awayTeam.name.toLowerCase())) {
                return linkElement.href;
            }
        }
    }
}

function getTotalSportekStreamPageUrls(htmlDocument) {

    const streamProviders = ["Bong Streams", "Footybite Streams", "BTS Streams"];
    const streamPageUrls = [];

    if (htmlDocument) {
        const divElements = htmlDocument.querySelectorAll("div.data-row");
        for (let i = 0; i < divElements.length; i++) {
            const divElement = divElements[i];
            const text = divElement.innerText?.toLowerCase().trim();

            const isStreamProvider = streamProviders
                .map(provider => provider.toLowerCase().trim())
                .find(provider => text.startsWith(provider));

            if (isStreamProvider) {
                const linkElement = divElement.querySelector("a");
                if (linkElement?.href) {
                    streamPageUrls.push(linkElement.href)
                }
            }
        }
    }

    return streamPageUrls;
}

async function getIframeStreamUrl(streamPageUrl) {
    const streamPage = await getHtmlDocument(streamPageUrl);
    const iframeElement = streamPage.querySelector("iframe");
    return iframeElement?.src;
}
