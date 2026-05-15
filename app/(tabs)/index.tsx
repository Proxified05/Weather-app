import { getBackgroundGradient } from '@/assets/images/background-gradient';
import { defaultGeocodingData } from '@/components/geocodingAPI/defaultGeocodingData';
import { getGeocodingAPI } from '@/components/geocodingAPI/geocodingAPIData';
import { defaultWeatherData } from '@/components/openmeteoAPI/defaultWeatherData';
import { getWeatherAPI } from '@/components/openmeteoAPI/weatherAPIData';

import CustomAlert from '@/components/customAlert/customAlert';
import CurrentWeather from '@/components/weather/currentWeather';
import DailyWeather from '@/components/weather/dailyWeather';
import HourlyWeather from '@/components/weather/hourlyWeather';

import NetInfo from "@react-native-community/netinfo";
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [background, setBackground] = useState(getBackgroundGradient(-1, 0));
  const [refreshing, setRefreshing] = useState(false)
  const [city, setCity] = useState('');
  const [cityDisplay, setCityDisplay] = useState('');
  const [opacity, setOpacity] = useState(1)
  const [lineChartData, setLineChartData] = useState<{ value: number; label: string }[]>([]);
  const [weather, setWeather] = useState<{
    current: any;
    daily: any[];
    hourly: any[];
  } | null>(null);
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
  })
  const weatherDesc = (code: number) => {
    switch (code) {
      case 0:
        return 'Clear Sky';
      case 1: case 2: case 3:
        return 'Partly Cloudy';
      case 45: case 48:
        return 'Foggy';
      case 51: case 53: case 55:
        return 'Drizzle';
      case 61: case 63: case 65: case 80: case 81: case 82:
        return 'Rain';
      case 71: case 73: case 75: case 85: case 86:
        return 'Snow Fall';
      case 95: case 96: case 99:
        return 'Thunderstorm';
      default:
        return '';
    }
  };

  // Keep background every search
  useEffect(() => {
    if (weather) {
      const gradient = getBackgroundGradient(
        weather.current.weatherCode,
        weather.current.hour
      );
      setBackground(gradient);
    }
  }, [weather]);

  //Set data after opening the app
  const getDefaultData = async () => {
    try {
      setOpacity(1)
      setWeather(null)

      // Check internet connection
      const state = await NetInfo.fetch()
      if (!state.isConnected) {
        setAlert({
          visible: true,
          message: "No internet connection!",
        })
        setOpacity(0)
        return
      }

      // Timeout
      const result = await Promise.race([
        (async () => {
          const geoCodingDataHanoi = await defaultGeocodingData(city)
          const weatherData = await defaultWeatherData(city)
          return {
            geoCodingDataHanoi,
            ...weatherData
          }
        })(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 15000)
        )
      ])

      // API 
      const { geoCodingDataHanoi, currentWeatherHanoi, dailyWeatherHanoi, hourlyWeatherHanoi } = result as any
      setCityDisplay(geoCodingDataHanoi.cityNameHanoi)
      setWeather({
        current: currentWeatherHanoi,
        daily: dailyWeatherHanoi,
        hourly: hourlyWeatherHanoi,
      })
      setLineChartData(
        hourlyWeatherHanoi.map((item: any) => ({
          value: item.temp,
          labelComponent: () => (
            <View style={{ alignItems: 'center', width: 50 }}>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                {item.hour}
              </Text>
              <Text style={{ color: 'white', fontSize: 9 }}>
                {item.date}
              </Text>
            </View>
          ),
        }))
      )
      console.log(geoCodingDataHanoi.cityNameHanoi, '\nCurrent Weather:', currentWeatherHanoi, '\nHourly Weather:', hourlyWeatherHanoi, '\nDaily Weather:', dailyWeatherHanoi);

    } catch (error: any) {
      console.log(error)
      if (error.message === "timeout") {
        setAlert({
          visible: true,
          message: "Request timeout. Please try again!",
        })
      } else {
        setAlert({
          visible: true,
          message: "Failed to load data!",
        })
      }
      setOpacity(0)
    }
  }
  useEffect(() => { getDefaultData(); }, []);

  // Get weather data when searching
  const getWeather = async (city: String) => {
    try {
      setOpacity(1)
      setCityDisplay('')
      setWeather(null)

      //Check internet connection
      const state = await NetInfo.fetch()
      if (!state.isConnected) {
        setAlert({
          visible: true,
          message: "No Internet connection! Please try again.",
        })
        setOpacity(0)
        return
      }

      // Timeout 
      const result = await Promise.race([
        (async () => {
          const geoCodingData = await getGeocodingAPI(city.trim())
          const weatherData = await getWeatherAPI(city.trim())

          return {
            geoCodingData,
            ...weatherData
          }
        })(),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("timeout")), 15000)
        )
      ])

      //API response
      const { geoCodingData, currentWeather, dailyWeather, hourlyWeather } = result as any
      setWeather({
        current: currentWeather,
        daily: dailyWeather,
        hourly: hourlyWeather,
      })
      setCityDisplay(geoCodingData.cityName)
      setLineChartData(hourlyWeather.map((item: { temp: number; hour: string; date: string }) => ({
        value: item.temp,
        labelComponent: () => (
          <View style={{ alignItems: 'center', width: 50 }}>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>{item.hour}</Text>
            <Text style={{ color: 'white', fontSize: 9 }}>{item.date}</Text>
          </View>
        ),
      })));
      console.log(geoCodingData.cityName, '\nCurrent Weather:', currentWeather, '\nHourly Weather:', hourlyWeather, '\nDaily Weather:', dailyWeather);

    } catch (error: any) {
      console.log(error)
      if (error.message === "timeout") {
        setAlert({
          visible: true,
          message: "Request timeout. Please try again!",
        })
      } else {
        setAlert({
          visible: true,
          message: "City not found!",
        })
      }
      setOpacity(0)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    if (city) {
      await getWeather(cityDisplay)
    } else {
      await getDefaultData()
    }
    setRefreshing(false)
  }

  return (
    <LinearGradient
      colors={background}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#ffffff"
          />
        }
      >
        <CustomAlert
          isVisible={alert.visible}
          title="Error"
          message={alert.message}
          onClose={() => setAlert({ ...alert, visible: false })}
        />

        <TextInput
          placeholder='Enter City Name'
          placeholderTextColor='#aaa'
          value={city}
          onChangeText={setCity}
          style={styles.input}
          onSubmitEditing={() => getWeather(city)}
        />

        {!weather && (
          <View style={{ marginTop: 50, opacity: opacity }}>
            <ActivityIndicator size='large' color='#ffffff' />
          </View>
        )}

        {weather && (
          <CurrentWeather city={cityDisplay} weather={weather} weatherDesc={weatherDesc} />
        )}

        {weather && (
          <HourlyWeather weather={weather} lineChartData={lineChartData} />
        )}

        {weather && (
          <DailyWeather weather={weather} />
        )}
      </ScrollView>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  // Overlay
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgb(24, 46, 55)',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },

  // Search Bar
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 12,
    borderRadius: 10,
    color: 'white',
    marginBottom: 20,
    marginTop: 50,
  },
});