import { getData } from "../CorsProxy";

export async function getPpvStreamsUrls(match) {
    const url = "https://ppvs.su/api/streams";
    const data = await getData(url);

    if (data?.streams) {
        const footballStreams = data.streams.find(stream => stream.category === "Football");
        const stream = footballStreams.streams.find(stream => stream.name.toLowerCase().includes(match.homeTeam.name.toLowerCase()) || stream.name.toLowerCase().includes(match.awayTeam.name.toLowerCase()))

        if (stream) {
            return [{
                url: stream.iframe,
                channel: stream.tag
            }];
        }

    }

    return null;
}
