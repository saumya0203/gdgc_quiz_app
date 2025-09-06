import { Tabs } from 'expo-router';
import { Chrome as Home, Trophy, User } from 'lucide-react-native';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#4F46E5' : 'transparent',
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 8,
                minWidth: focused ? 80 : 40,
                alignItems: 'center',
              }}>
              <Home size={24} color={focused ? 'white' : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#22C55E' : 'transparent',
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 8,
                minWidth: focused ? 80 : 40,
                alignItems: 'center',
              }}>
              <Trophy size={24} color={focused ? 'white' : color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                backgroundColor: focused ? '#F59E0B' : 'transparent',
                borderRadius: 20,
                paddingHorizontal: 20,
                paddingVertical: 8,
                minWidth: focused ? 80 : 40,
                alignItems: 'center',
              }}>
              <User size={24} color={focused ? 'white' : color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}