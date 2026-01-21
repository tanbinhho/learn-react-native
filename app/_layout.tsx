import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { Suspense, useMemo } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAppBootstrap } from '@/hooks/useAppBootstrap';
import { useAppStore } from '@/store/useAppStore';
import { ToastProvider } from '@gluestack-ui/toast';
import { PortalProvider } from '@gorhom/portal';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import '../global.css';

SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const unstable_settings = {
  anchor: '(protected)',
};

const queryClient = new QueryClient();
const ConfirmHost = React.lazy(() => import('@/components/common/ConfirmHost'));

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const ready = useAppBootstrap();
  const theme = useAppStore((s) => s.theme);

  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return colorScheme ?? 'light';
    }
    return theme;
  }, [colorScheme, theme]);

  const navigationTheme = resolvedTheme === 'dark' ? DarkTheme : DefaultTheme;
  const providerMode = resolvedTheme === 'dark' ? 'dark' : 'light';
  const statusBarStyle = providerMode === 'dark' ? 'light' : 'dark';

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={navigationTheme}>
          <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode={providerMode}>
              <PortalProvider>
                <ToastProvider>
                  <Suspense fallback={null}>
                    <ConfirmHost />
                  </Suspense>
                  <Stack>
                    <Stack.Screen name="(protected)" options={{ headerShown: false }} />
                    <Stack.Screen name="(public)/login" options={{ headerShown: false }} />
                    <Stack.Screen name="(public)" options={{ headerShown: false }} />
                    <Stack.Screen
                      name="modal"
                      options={{ presentation: 'modal', title: 'Modal' }}
                    />
                    <Stack.Screen name="+not-found" options={{ title: 'Not found' }} />
                  </Stack>
                </ToastProvider>
              </PortalProvider>
            </GluestackUIProvider>
          </QueryClientProvider>
          <StatusBar style={statusBarStyle} backgroundColor="transparent" translucent />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
