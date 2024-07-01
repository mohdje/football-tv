import { getData } from "../CorsProxy";

export async function getDldhStreamsUrls(match) {

    const baseUrl = "https://dlhd.so";
    const data = await getData(`${baseUrl}/schedule/schedule-generated.json`);

    if (data) {
        // Get the first property value
        const [sports] = Object.values(data);

        console.log("sports", sports)
        if (sports?.Soccer?.length > 0) {
            const event = sports.Soccer.find(
                soccerMatch => soccerMatch.event.toLowerCase().includes(match.homeTeam.name.toLowerCase())
                    || soccerMatch.event.toLowerCase().includes(match.awayTeam.name.toLowerCase()));

            if (event) {
                return event.channels?.map(channel => `https://dlhd.sx/embed/stream-${channel.channel_id}.php`);
            }
        }
    }

}
