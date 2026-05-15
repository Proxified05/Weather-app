export const getGeocodingAPI = async (city: string) => {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch geocoding data");
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
    }
    const latitude: number = data.results[0].latitude;
    const longitude: number = data.results[0].longitude;
    const cityName: string = data.results[0].name;
    return { latitude, longitude, cityName };
};
