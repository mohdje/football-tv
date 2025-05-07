import { getTotalSportekStreamsUrls } from "./streamSearchers/TotalSportekStreamsSearcher";
import { getSportsBayStreamsUrls } from "./streamSearchers/SportsbayStreamsSearcher";
import { getDldhStreamsUrls } from "./streamSearchers/DlhdStreamSearcher";
import { getSoccerStreamAppStreamsUrls } from "./streamSearchers/SoccerStreamsAppStreamsSearcher";
import { getPpvStreamsUrls } from "./streamSearchers/PpvStreamSearcher";


export async function searchMatchStreamsAsync(match, onStreamsFound, onNoStreamFound) {
    // const promises = [
    //     getSportsBayStreamsUrls(match),
    //     getTotalSportekStreamsUrls(match),
    //     getDldhStreamsUrls(match),
    //     getSoccerStreamAppStreamsUrls(match),
    //     getPpvStreamsUrls(match)];

    const promises = [
        getSportsBayStreamsUrls(match),
        getPpvStreamsUrls(match)];

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

