import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="sciences" options={{ headerShown: false }} />
        <Stack.Screen name="technology" options={{ headerShown: false }} />
        <Stack.Screen name="arts" options={{ headerShown: false }} />
        <Stack.Screen name="business" options={{ headerShown: false }} />
        <Stack.Screen name="data-scientist" options={{ headerShown: false }} />
        <Stack.Screen name="ux-designer" options={{ headerShown: false }} />
        <Stack.Screen name="marketing-manager" options={{ headerShown: false }} />
        <Stack.Screen name="graphic-designer" options={{ headerShown: false }} />
        <Stack.Screen name="research-scientist" options={{ headerShown: false }} />
        <Stack.Screen name="biotech-engineer" options={{ headerShown: false }} />
        <Stack.Screen name="environmental-scientist" options={{ headerShown: false }} />
        <Stack.Screen name="software-engineer" options={{ headerShown: false }} />
        <Stack.Screen name="product-manager" options={{ headerShown: false }} />
        <Stack.Screen name="devops-engineer" options={{ headerShown: false }} />
        <Stack.Screen name="illustrator" options={{ headerShown: false }} />
        <Stack.Screen name="art-director" options={{ headerShown: false }} />
        <Stack.Screen name="animator" options={{ headerShown: false }} />
        <Stack.Screen name="financial-manager" options={{ headerShown: false }} />
        <Stack.Screen name="investment-banker" options={{ headerShown: false }} />
        <Stack.Screen name="sales-manager" options={{ headerShown: false }} />
        <Stack.Screen name="quiz" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
