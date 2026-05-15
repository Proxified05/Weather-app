import { defaultGeocodingData } from "../geocodingAPI/defaultGeocodingData";
export const defaultWeatherData = async (city: string) => {
    const { latitudeHanoi, longitudeHanoi } = await defaultGeocodingData(city);
    const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitudeHanoi}&longitude=${longitudeHanoi}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,visibility,uv_index&temperature_unit=celsius&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&hourly=weather_code,temperature_2m`,
    );
    const data = await weatherResponse.json();

    //Current weather
    const currentWeatherHanoi = {
        hour: new Date(data.current.time).getHours(),
        weatherCode: data.current.weather_code,
        temperature: Math.round(data.current.temperature_2m),
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m * 3.6),
        visibility: Math.round(data.current.visibility / 1000),
        UVIndex: Math.round(data.current.uv_index),
        UVLevel: (uv: number) => {
            if (uv <= 2) return "Low";
            if (uv <= 5) return "Moderate";
            if (uv <= 7) return "High";
            if (uv <= 10) return "Very High";
            return "Extreme";
        }
    }

    //Hourly weather for next 48h
    const hourlyWeatherHanoi = data.hourly.time
        .slice(1, 49)
        .filter((_: number, index: number) => index % 3 === 0)
        .map((time: number, index: number) => ({
            date: time.toString().substring(5, 10),
            hour: time.toString().substring(11),
            temp: Math.round(data.hourly.temperature_2m[index * 3 + 1]),
            weatherCode: data.hourly.weather_code[index * 3 + 1],
        }));

    //Daily weather for next 6 days
    function numToDay(num: number) {
        switch (num) {
            case 0: return "Sun";
            case 1: return "Mon";
            case 2: return "Tue";
            case 3: return "Wed";
            case 4: return "Thu";
            case 5: return "Fri";
            case 6: return "Sat";
        }
    }
    const dailyWeatherHanoi = data.daily.time.slice(0, 7).map((time: number, index: number) => ({
        date: numToDay(new Date(time).getDay()),
        minTemp: data.daily.temperature_2m_min[index],
        maxTemp: data.daily.temperature_2m_max[index],
        weatherCode: data.daily.weather_code[index],
    }))
    return { data, currentWeatherHanoi, dailyWeatherHanoi, hourlyWeatherHanoi };
}