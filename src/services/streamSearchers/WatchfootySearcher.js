/**
 * Retrieves stream URLs for a given match from Watchfooty API.
 *
 * @param {Object} match - The match object containing at least:
 *   - homeTeam.name
 *   - awayTeam.name
 * @returns {Promise<Array<{url: string, channel: string}>>}
 *   An array of stream objects. Returns an empty array if no streams are found.
 */
export async function getStreamFooty(match) {
    // Fetch all football matches from Watchfooty API
    const response = await fetch('https://api.watchfooty.st/api/v1/matches/football');
    if (!response.ok) {
        console.error(`Failed to fetch matches from Watchfooty for ${match.homeTeam.name} vs ${match.awayTeam.name}`);
        return [];
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
        console.error('Unexpected data format from Watchfooty API');
        return [];
    }

    const homeName = match.homeTeam.name.toLowerCase();
    const awayName = match.awayTeam.name.toLowerCase();

    // Find the match that contains both team names (case‑insensitive, partial match allowed)
    const found = data.find(item => {
        const streamHome = item.teams?.home?.name?.toLowerCase() ?? "";
        const streamAway = item.teams?.away?.name?.toLowerCase() ?? "";
        return streamHome.includes(homeName) || streamHome.includes(awayName) || streamAway.includes(homeName) || streamAway.includes(awayName);
    });

    // The API returns a `streams` array; if missing, return empty array
    return found?.streams?.map(s => ({
        url: s?.url ?? '',
        channel: s?.language + ' - ' + s?.quality
    })) ?? [];
}