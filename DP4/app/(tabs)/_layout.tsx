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
        tabBarActiveTintColor: '#9333EA',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FDF2F8',
          borderTopColor: '#F9A8D4',
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

      <Tabs.Screen name="sciences" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="technology" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="arts" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="business" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="data-scientist" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="ux-designer" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="marketing-manager" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="graphic-designer" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="research-scientist" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="biotech-engineer" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="environmental-scientist" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="software-engineer" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="product-manager" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="devops-engineer" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="illustrator" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="art-director" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="animator" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="financial-manager" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="investment-banker" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="sales-manager" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="quiz" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}
