import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { createGlobalStyles } from '../styles/globalStyles';

/**
 * Custom hook that provides both theme colors and global styles
 * Usage:
 * const { colors, globalStyles } = useThemedStyles();
 * 
 * Then use:
 * <View style={globalStyles.container}>
 * <Text style={globalStyles.title}>Title</Text>
 */
export const useThemedStyles = () => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  
  // Memoize global styles to prevent recreation on every render
  const globalStyles = useMemo(() => createGlobalStyles(colors), [colors]);
  
  return {
    colors,
    globalStyles,
    isDarkMode,
    toggleDarkMode,
  };
};

