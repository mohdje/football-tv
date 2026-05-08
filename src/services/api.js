const baseUrl = process.env.REACT_APP_API_HOST + '/api';

export async function getMatches() {
    console.log(`Fetching matches from ${baseUrl}`);
    return await fetchData(`${baseUrl}/matches`);
}

export async function getStreams(homeTeam, awayTeam) {
    const url = `${baseUrl}/streams?homeTeam=${encodeURIComponent(homeTeam)}&awayTeam=${encodeURIComponent(awayTeam)}`;
    return await fetchData(url);
}

async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error fetching data from ${url}: ${response.statusText}`);
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Network error while fetching data from ${url}:`, error);
        return null;
    }
}