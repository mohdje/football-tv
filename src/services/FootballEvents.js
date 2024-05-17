import { getHtmlDocument } from "./CorsProxy";

export async function getTodaysMatches() {
    const result = [];

    const leaguesToKeep = ["Premier League", "LaLiga", "Ligue 1", "Bundesliga", "Serie A", "UEFA Champions League", "UEFA European Championship"];

    const htmlDocument = await getHtmlDocument("https://onefootball.com/en/matches", true);

    if (!htmlDocument)
        return result;

    const script = htmlDocument.scripts.namedItem("__NEXT_DATA__");
    const data = JSON.parse(script.text);

    const matchesListContainers = data?.props.pageProps.containers.filter(container => container.type.fullWidth.component.contentType.$case === "matchCardsList");

    if (matchesListContainers) {
        const matchesLists = matchesListContainers.map(container => container.type.fullWidth.component.contentType.matchCardsList);
        let matchId = 0;
        matchesLists.forEach(matchList => {
            const leagueName = matchList.sectionHeader.title;
            if (leaguesToKeep.includes(leagueName)) {
                const league = {
                    name: leagueName,
                    logo: matchList.sectionHeader.entityLogo.path
                };

                const matches = [];
                matchList.matchCards.forEach(match => {
                    matches.push({
                        id: matchId++,
                        homeTeam: {
                            name: match.homeTeam.name,
                            logo: match.homeTeam.imageObject.path
                        },
                        awayTeam: {
                            name: match.awayTeam.name,
                            logo: match.awayTeam.imageObject.path
                        },
                        startDateTime: new Date(match.kickoff)
                    });

                });
                result.push({ league: league, matches: matches });
            }
        });
    }

    return result;
}

