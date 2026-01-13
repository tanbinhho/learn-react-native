import { useAppStore } from '@/store/useAppStore';
import { useAuthStore } from '@/store/useAuthStore';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Fast-boot: always return true; still kick off hydration in background and hide splash quickly.
export const useAppBootstrap = () => {
  const { hydrate: hydrateAuth } = useAuthStore();

  useEffect(() => {
    hydrateAuth();
    useAppStore.persist?.rehydrate?.();

    // Ensure splash hides even if hydration events fail
    SplashScreen.hideAsync().catch(() => null);
  }, [hydrateAuth]);

  return true;
};
