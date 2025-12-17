import 'dotenv/config';

export default {
  expo: {
    name: 'WeatherApp',
    slug: 'weather-app',
    extra: {
      EXPO_PUBLIC_APIKEY: process.env.EXPO_PUBLIC_APIKEY,
    },
  },
};