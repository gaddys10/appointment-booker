import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="bookings/upcoming-bookings" options={{ headerShown: false }} />
      <Stack.Screen name="bookings/submitted-bookings" options={{ headerShown: false }} />
      <Stack.Screen name="bookings/previous-bookings" options={{ headerShown: false }} />
      <Stack.Screen name="bookings/my-services" options={{ headerShown: false }} />
      <Stack.Screen name="bookings/favorites" options={{ headerShown: false }} />
    </Stack>
  );
}
