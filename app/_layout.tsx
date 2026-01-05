import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppBootstrap } from '@/hooks/useAppBootstrap';
import { useAppStore } from '@/store/useAppStore';
// import { GluestackUIProvider } from '@gluestack-ui/themed';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';
// import { gluestackUIConfig } from '../gluestack.config';
import { ToastProvider } from '@gluestack-ui/toast';

SplashScreen.preventAutoHideAsync();
export const unstable_settings = {
  anchor: '(protected)',
};

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const ready = useAppBootstrap();
  const theme = useAppStore((s) => s.theme);

  if (!ready) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider
        value={
          theme === 'system'
            ? colorScheme === 'dark'
              ? DarkTheme
              : DefaultTheme
            : theme === 'dark'
              ? DarkTheme
              : DefaultTheme
        }
      >
        <QueryClientProvider client={queryClient}>
          {/* <GluestackUIProvider config={gluestackUIConfig}> */}
          <ToastProvider>
            <Stack>
              <Stack.Screen name="(protected)" options={{ headerShown: false }} />
              <Stack.Screen name="(public)/login" options={{ headerShown: false }} />
              <Stack.Screen name="(public)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
              <Stack.Screen name="+not-found" options={{ title: 'Not found' }} />
            </Stack>
          </ToastProvider>
          {/* </GluestackUIProvider> */}
        </QueryClientProvider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
