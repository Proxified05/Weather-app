const weatherImages = {
    clearSkyDay: require('./weather_icons/clear_sky_day.png'),
    clearSkyNight: require('./weather_icons/clear_sky_night.png'),

    drizzleDay: require('./weather_icons/drizzle_day.png'),
    drizzleNight: require('./weather_icons/drizzle_night.png'),

    partlyCloudyDay: require('./weather_icons/partly_cloudy_day.png'),
    partlyCloudyNight: require('./weather_icons/partly_cloudy_night.png'),

    foggy: require('./weather_icons/foggy.png'),
    rain: require('./weather_icons/rain.png'),
    snowFall: require('./weather_icons/snow_fall.png'),
    thunderstorm: require('./weather_icons/thunderstorm.png'),
};

export const getCurrentWeatherIcon = (code: number, weather: any) => {
    switch (code) {
        case 0:
            if (weather && weather.current.hour >= 6 && weather.current.hour < 18) {
                return weatherImages.clearSkyDay;
            } else {
                return weatherImages.clearSkyNight;
            }
        case 1: case 2: case 3:
            if (weather && weather.current.hour >= 6 && weather.current.hour < 18) {
                return weatherImages.partlyCloudyDay;
            } else {
                return weatherImages.partlyCloudyNight;
            }
        case 45: case 48:
            return weatherImages.foggy;
        case 51: case 53: case 55:
            if (weather && weather.current.hour >= 6 && weather.current.hour < 18) {
                return weatherImages.drizzleDay;
            } else {
                return weatherImages.drizzleNight;
            }
        case 61: case 63: case 65: case 80: case 81: case 82:
            return weatherImages.rain;
        case 71: case 73: case 75: case 85: case 86:
            return weatherImages.snowFall;
        case 95: case 96: case 99:
            return weatherImages.thunderstorm;
        default:
    }
};

export const getHourlyWeatherIcon = (code: number, hour: string) => {
    switch (code) {
        case 0:
            if (hour >= '06' && hour < '18') {
                return weatherImages.clearSkyDay;
            } else {
                return weatherImages.clearSkyNight;
            }
        case 1: case 2: case 3:
            if (hour >= '06' && hour < '18') {
                return weatherImages.partlyCloudyDay;
            } else {
                return weatherImages.partlyCloudyNight;
            }
        case 45: case 48:
            return weatherImages.foggy;
        case 51: case 53: case 55:
            if (hour >= '06' && hour < '18') {
                return weatherImages.drizzleDay;
            } else {
                return weatherImages.drizzleNight;
            }
        case 61: case 63: case 65: case 80: case 81: case 82:
            return weatherImages.rain;
        case 71: case 73: case 75: case 85: case 86:
            return weatherImages.snowFall;
        case 95: case 96: case 99:
            return weatherImages.thunderstorm;
        default:
    }
};