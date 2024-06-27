export async function getCountryNameTranslation(englishCountryName, ISO3language) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${englishCountryName}`);

    if (response.ok) {
        const data = await response.json();
        return data[0]?.translations[`${ISO3language}`]?.common ?? null;
    }

    return null;
}