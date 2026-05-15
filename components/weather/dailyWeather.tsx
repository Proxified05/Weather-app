import { getCurrentWeatherIcon } from '@/assets/images/icon';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function DailyWeather({ weather }: { weather: any }) {
    if (!weather || !Array.isArray(weather.daily)) {
        return null;
    }
    return (
        <View style={styles.sectionBorder}>
            <Text style={styles.sectionTitle}>7-Day Forecast</Text>

            {weather.daily.map((item: any) => (
                <View key={item.date} style={styles.dailyRow}>
                    <Text style={styles.dailyDate}>{item.date}</Text>

                    <Image
                        source={getCurrentWeatherIcon(item.weatherCode, weather)}
                        style={styles.dailyIcon}
                    />

                    <Text style={styles.dailyTemp}>
                        {Math.floor(item.minTemp)} - {Math.floor(item.maxTemp)}°C
                    </Text>
                </View>
            ))}
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
    sectionTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dailyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    dailyDate: {
        color: 'white',
        flex: 1,
    },
    dailyIcon: {
        width: 28,
        height: 28,
    },
    dailyTemp: {
        color: 'white',
        flex: 1,
        textAlign: 'right',
    },
})