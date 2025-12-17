import 'dotenv/config';
import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'WeatherApp',
  slug: 'weather-app',
  version: '1.0.0',
  extra: {
    EXPO_PUBLIC_APIKEY: process.env.EXPO_PUBLIC_APIKEY as string,
  },
};

export default config;