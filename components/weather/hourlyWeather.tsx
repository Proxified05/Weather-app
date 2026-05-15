import { getHourlyWeatherIcon } from '@/assets/images/icon';
import WeatherLineChart from '@/components/line-chart';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function HourlyWeather({ weather, lineChartData }: { weather: any; lineChartData: any[] }) {
    return (
        <View style={styles.sectionBorder}>
            <Text style={styles.sectionTitle}>Hourly Forecast</Text>

            <WeatherLineChart data={lineChartData} />

            <FlatList
                data={weather.hourly}
                horizontal
                keyExtractor={(item) => item.date + item.hour}
                showsHorizontalScrollIndicator={true}
                renderItem={({ item }) => (
                    <View style={styles.hourlyItem}>
                        <Text style={styles.date}>{item.date}</Text>
                        <Text style={styles.hour}>{item.hour}</Text>
                        <Image
                            source={getHourlyWeatherIcon(item.weatherCode, item.hour)}
                            style={styles.hourlyIcon}
                        />
                        <Text style={styles.hourTemp}>{item.temp}°C</Text>
                    </View>
                )}
            />
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
    hourlyItem: {
        alignItems: 'center',
        marginRight: 20,
        borderColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        padding: 6,
        borderRadius: 8,
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    hourlyIcon: {
        width: 30,
        height: 30,
        marginVertical: 6,
    },
    date: {
        color: 'white',
        fontSize: 11,
        textAlign: 'center',
        marginBottom: 2,
    },
    hour: {
        color: 'white',
        fontWeight: 'bold',
    },
    hourTemp: {
        color: 'white',
    },
})