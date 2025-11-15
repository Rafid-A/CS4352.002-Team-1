import { Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Text } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { savedJobsStorage, favoriteMentorsStorage, savedCoursesStorage } from '../../utils/storage';
import { savedJobs, favoriteMentors, savedCourses } from '../../data/savedData';
import { useTheme } from '../../context/ThemeContext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  // Initialize storage with sample data on first load
  useEffect(() => {
    const initializeStorage = async () => {
      try {
        // Check if data already exists
        const existingJobs = await savedJobsStorage.get();
        const existingMentors = await favoriteMentorsStorage.get();
        const existingCourses = await savedCoursesStorage.get();

        // Only add sample data if storage is empty
        if (existingJobs.length === 0) {
          await savedJobsStorage.set(savedJobs);
        }
        if (existingMentors.length === 0) {
          await favoriteMentorsStorage.set(favoriteMentors);
        }
        if (existingCourses.length === 0) {
          await savedCoursesStorage.set(savedCourses);
        }
      } catch (error) {
        console.log('Error initializing storage:', error);
      }
    };

    initializeStorage();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textTertiary,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: colors.cardBackground,
          borderTopColor: colors.border,
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
      <Tabs.Screen
        name="mentors"
        options={{
          title: 'Mentors',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 28 }}>👥</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="all-courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 28 }}>📚</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 28 }}>👤</Text>
          ),
        }}
      />

      {/* Hidden Tab Pages - Show tab bar but not in tab list */}
      <Tabs.Screen name="chat" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="saved-jobs" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="favorite-mentors" options={{ href: null, headerShown: false }} />
      <Tabs.Screen name="saved-courses" options={{ href: null, headerShown: false }} />
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
