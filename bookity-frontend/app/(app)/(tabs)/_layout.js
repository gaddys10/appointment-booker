// app/(app)/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fff',  // Active tab label color
        tabBarInactiveTintColor: '#999',   // Inactive tab label color
        tabBarActiveBackgroundColor: '#2E5A6D',
        headerShown: false,
    }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />

        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="search-outline" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="book-now"
        options={{
          title: 'Book Now',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="my-bookings"
        options={{
          title: 'My Bookings',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" size={size} color={color} />
        }}
      />
      <Tabs.Screen
        name="my-account"
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />
        }}
      />
    </Tabs>
  );
}
