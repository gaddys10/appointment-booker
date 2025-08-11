import { Platform } from 'react-native';

// Override with an env var when you’re on a physical device or using ngrok:
const ENV = process.env.EXPO_PUBLIC_API_URL;

const LOCAL =
  Platform.OS === 'ios' ? 'http://127.0.0.1:3000' : // iOS Simulator
  Platform.OS === 'android' ? 'http://10.0.2.2:3000' : // Android Emulator
'http://localhost:3000';

export const API_BASE = ENV ?? LOCAL;