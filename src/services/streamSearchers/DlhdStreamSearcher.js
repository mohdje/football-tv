import { getData } from "../CorsProxy";

export async function getDldhStreamsUrls(match) {

    const url = "https://thedaddy.to/schedule/schedule-generated.json";
    const data = await getData(url);

    if (data) {
        // Get the first property value
        const [sports] = Object.values(data);

        if (sports?.Soccer?.length > 0) {
            const event = sports.Soccer.find(
                soccerMatch => soccerMatch.event.toLowerCase().includes(match.homeTeam.name.toLowerCase())
                    || soccerMatch.event.toLowerCase().includes(match.awayTeam.name.toLowerCase()));

            if (event?.channels?.map) {
                return event.channels.map(channel => {
                    return {
                        url: `https://thedaddy.to/embed/stream-${channel.channel_id}.php`,
                        channel: channel.channel_name
                    }
                });
            }
        }
    }

}
