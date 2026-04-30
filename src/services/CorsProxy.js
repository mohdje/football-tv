export async function getHtmlDocument(url) {
    return await fetchData({
        url: url,
        parseToHtmlDocument: true
    })
}

export async function getData(url) {
    return await fetchData({
        url: url,
        parseToJsonObject: true
    })
}

async function fetchData(options) {
    try {
        const proxyUrl = buildProxyUrl(options.url);
        const response = await fetch(proxyUrl);

        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        if (options.parseToHtmlDocument) {
            const parser = new DOMParser();
            const text = await response.text();
            const document = await parser.parseFromString(text, 'text/html');

            return document;
        }
        else if (options.parseToJsonObject) {
            const data = await response.json();
            return data;
        }

    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

function buildProxyUrl(targetUrlPage) {
    const proxyUrl = "https://football-tv-serverless.vercel.app/api/corsProxy";
    const encodedUri = encodeURIComponent(targetUrlPage);
    return `${proxyUrl}?url=${encodedUri}`;
}
