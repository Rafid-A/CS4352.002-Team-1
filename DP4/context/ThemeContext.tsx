import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: {
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    textTertiary: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    border: string;
    cardBackground: string;
    inputBackground: string;
    shadow: string;
  };
  themed: (lightValue: any, darkValue?: any) => any;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from storage
  useEffect(() => {
    const loadDarkMode = async () => {
      try {
        const darkModeValue = await AsyncStorage.getItem('darkMode');
        if (darkModeValue !== null) {
          setIsDarkMode(JSON.parse(darkModeValue));
        }
      } catch (error) {
        console.log('Error loading dark mode:', error);
      }
    };
    loadDarkMode();
  }, []);

  const toggleDarkMode = async () => {
    try {
      const newValue = !isDarkMode;
      setIsDarkMode(newValue);
      await AsyncStorage.setItem('darkMode', JSON.stringify(newValue));
    } catch (error) {
      console.log('Error saving dark mode:', error);
    }
  };

  const colors = {
    // Light/Dark mode colors
    background: isDarkMode ? '#0F172A' : '#FDF2F8',
    surface: isDarkMode ? '#1E293B' : '#FFFFFF',
    text: isDarkMode ? '#F1F5F9' : '#1F2937',
    textSecondary: isDarkMode ? '#94A3B8' : '#6B7280',
    textTertiary: isDarkMode ? '#64748B' : '#9CA3AF',
    primary: '#9333EA',
    primaryLight: isDarkMode ? '#581C87' : '#F3E8FF',
    primaryDark: isDarkMode ? '#A855F7' : '#7E22CE',
    border: isDarkMode ? '#334155' : '#F3E8FF',
    cardBackground: isDarkMode ? '#1E293B' : '#FFFFFF',
    inputBackground: isDarkMode ? '#334155' : '#F3F4F6',
    shadow: isDarkMode ? '#000000' : '#000000',
  };

  // Helper function to apply theme-aware colors
  const themed = (lightValue: any, darkValue?: any) => {
    if (darkValue === undefined) {
      // If only one value provided, use colors object
      return colors[lightValue as keyof typeof colors] || lightValue;
    }
    return isDarkMode ? darkValue : lightValue;
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors, themed }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

