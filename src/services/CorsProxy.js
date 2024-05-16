export async function getHtmlDocument(url) {
    try {
        const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(url);

        // Fetch the HTML content
        const response = await fetch(proxyUrl);
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
        }

        // Parse the HTML content
        const parser = new DOMParser();
        const text = await response.text()
        const document = await parser.parseFromString(text, 'text/html');

        return document;

        // Or to insert the entire HTML content into a specific element in your document
        // document.getElementById('targetElementId').innerHTML = doc.documentElement.outerHTML;
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}
