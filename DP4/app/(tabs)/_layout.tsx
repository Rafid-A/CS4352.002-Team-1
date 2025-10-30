import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#9333EA', // Purple to match app
        tabBarInactiveTintColor: '#9CA3AF', // Gray
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FDF2F8', // Pink background like the app
          borderTopColor: '#F9A8D4', // Pink border
          borderTopWidth: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 28 }}>🏠</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 28 }}>💼</Text>
          ),
        }}
      />
    </Tabs>
  );
}
