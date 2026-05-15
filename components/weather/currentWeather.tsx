import { getCurrentWeatherIcon } from '@/assets/images/icon';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function CurrentWeather({ city, weather, weatherDesc }: { city: string, weather: any, weatherDesc: (code: number) => string }) {
    return (
        <View style={styles.sectionBorder}>
            <View style={styles.currentRow}>
                <View style={styles.left}>
                    <Text style={styles.cityText}>{city}</Text>
                    <View style={styles.iconTempRow}>
                        <Image
                            source={getCurrentWeatherIcon(weather.current.weatherCode, weather)}
                            style={styles.currentIcon}
                        />
                        <Text style={styles.temperature}>{weather.current.temperature}°C </Text>
                    </View>
                    <Text style={styles.description}>{weatherDesc(weather.current.weatherCode)} </Text>
                </View>

                <View style={styles.right}>
                    <Text style={styles.smallText}>Wind: {weather.current.windSpeed} km/h</Text>
                    <Text style={styles.smallText}>Humidity: {weather.current.humidity}%</Text>
                    <Text style={styles.smallText}>Visibility: {weather.current.visibility} km</Text>
                    <Text style={styles.smallText}>UV Index: {weather.current.UVIndex} - {weather.current.UVLevel(weather.current.UVIndex)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionBorder: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
    },
    cityText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    currentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    left: {
        flex: 4,
    },
    right: {
        flex: 3,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    iconTempRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentIcon: {
        width: 40,
        height: 40,
        marginRight: 8,
    },
    temperature: {
        color: 'white',
        fontSize: 26,
        fontWeight: 'bold',
    },
    description: {
        color: 'white',
        marginTop: 6,
    },
    smallText: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 11,
        marginBottom: 4,
    },
})