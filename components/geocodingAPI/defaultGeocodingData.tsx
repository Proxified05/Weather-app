export const defaultGeocodingData = async (city: string) => {
    const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=Hanoi&count=1&language=en&format=json`
    );
    const data = await response.json();
    const latitudeHanoi: number = data.results[0].latitude;
    const longitudeHanoi: number = data.results[0].longitude;
    const cityNameHanoi: string = data.results[0].name;
    return { latitudeHanoi, longitudeHanoi, cityNameHanoi };
}