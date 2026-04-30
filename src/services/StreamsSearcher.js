import { getStreamsPk } from "./streamSearchers/StreamedPkSearcher";
import { getStreamFooty } from "./streamSearchers/WatchfootySearcher";


export async function searchMatchStreamsAsync(match, onStreamsFound, onNoStreamFound) {
    const promises = [
        getStreamsPk(match),
        getStreamFooty(match)
    ];

    let foundStreams = false;
    const searchStreamPromise = async (promise) => {
        const streams = await promise;
        if (streams?.length > 0) {
            onStreamsFound(streams);
            foundStreams = true;
        }
    }

    await Promise.all(promises.map(promise => searchStreamPromise(promise)));


    if (!foundStreams)
        onNoStreamFound();
}

