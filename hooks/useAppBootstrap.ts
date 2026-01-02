import { useAppStore } from '@/store/useAppStore';
import { useAuthStore } from '@/store/useAuthStore';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export const useAppBootstrap = () => {
  const { hydrate: hydrateAuth, hydrated: authHydrated } = useAuthStore();

  // zustand persist có sẵn flag
  const appHydrated = useAppStore.persist.hasHydrated();

  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrateAuth();
  }, []);

  useEffect(() => {
    if (authHydrated && appHydrated) {
      setReady(true);
      SplashScreen.hideAsync();
    }
  }, [authHydrated, appHydrated]);

  return ready;
};
