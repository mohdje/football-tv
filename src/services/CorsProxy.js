export async function getHtmlDocument(url, avoidCache) {
    return await fetchData({
        url: url,
        avoidCache: avoidCache,
        parseToHtmlDocument: true
    })
}

export async function getData(url, avoidCache) {
    return await fetchData({
        url: url,
        avoidCache: avoidCache,
        parseToJsonObject: true
    })
}

async function fetchData(options) {
    try {
        const proxyUrl = buildProxyUrl(options.url, options.avoidCache);
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

function buildProxyUrl(targetUrlPage, avoidCache) {
    const proxyUrl = "https://corsproxy.io";
    if (avoidCache) {
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);
        const avoidCacheParameter = `footballtvapp=${date.getTime()}`;

        const queryCharSeparator = targetUrlPage.includes('?') ? "&" : "?";
        const encodedUri = encodeURIComponent(`${targetUrlPage}${queryCharSeparator}${avoidCacheParameter}`);
        return `${proxyUrl}/?${encodedUri}`;

    } else {
        const encodedUri = encodeURIComponent(targetUrlPage);
        return `${proxyUrl}/?${encodedUri}`;
    }
}
