/**
 * Retrieves stream URLs for a given match.
 *
 * @param {Object} match - The match object containing at least:
 *   - homeTeam.name
 *   - awayTeam.name
 * @returns {Promise<Array<{url: string, channel: string}>>}
 *   An array of stream objects, each with a `url` and `channel` name.
 *   Returns an empty array if no streams are found.
 */
export async function getStreamsPk(match) {
    const matchSources = await getMatchSources(match);

    if (!matchSources || matchSources.length === 0) {
        return [];
    }

    const streamUrlsArrays = await Promise.all(matchSources.map((source) => getSourceStreams(source)));
    const streamUrls = streamUrlsArrays.flat();

    return streamUrls;
}

async function getMatchSources(match) {
    const response = await fetch('https://streamed.pk/api/matches/football');

    if (!response.ok) {
        console.error(`Failed to fetch sources for match ${match.homeTeam.name} vs ${match.awayTeam.name}`);
        return [];
    }

    const data = await response.json();
    if (!data)
        return [];

    const homeTeamName = match.homeTeam.name.toLowerCase();
    const awayTeamName = match.awayTeam.name.toLowerCase();

    return data.find(match => {
        const streamHomeTeam = match.teams?.home?.name.toLowerCase() ?? "";
        const streamAwayTeam = match.teams?.away?.name.toLowerCase() ?? "";

        return streamHomeTeam.includes(homeTeamName) || streamAwayTeam.includes(awayTeamName) ||
            streamHomeTeam.includes(awayTeamName) || streamAwayTeam.includes(homeTeamName);
    })?.sources;
}

async function getSourceStreams(source) {
    const response = await fetch(`https://streamed.pk/api/stream/${source.source}/${source.id}`);
    if (!response.ok) {
        console.error(`Failed to fetch stream for source ${source.source} with id ${source.id}`);
        return [];
    }

    const streams = await response.json();
    return streams?.filter(stream => stream.embedUrl).map(stream => {
        return {
            url: stream.embedUrl ?? "",
            channel: `${stream.language ?? 'Unknown'} channel`
        }
    }) ?? [];
}