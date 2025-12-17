import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import Constants from 'expo-constants';



const API_KEY = Constants.manifest?.extra?.EXPO_PUBLIC_APIKEY as string;

interface WeatherData {
  name: string;
  sys: { country: string };
  main: { temp: number };
  weather: { description: string }[];
}



export default function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Ask for location permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setError('Location permission denied');
          setLoading(false);
          return;
        }

        // Get device location
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        // Fetch weather using fetch API
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather');
        }

        const data: WeatherData = await response.json();
        setWeather(data);
      } catch (err) {
        setError('Could not load weather data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading weather...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {weather?.name}, {weather?.sys.country}
      </Text>
      <Text style={styles.temp}>{weather?.main.temp}°C</Text>
      <Text style={styles.desc}>{weather?.weather[0].description}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87ceeb',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#fff',
  },
  desc: {
    fontSize: 22,
    fontStyle: 'italic',
    color: '#fff',
  },
});