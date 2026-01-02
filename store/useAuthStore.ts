import { STORAGE_KEYS } from '@/constants/storageKeys';
import { secureStorage } from '@/utils/secure-storage';
import { create } from 'zustand';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  hydrated: boolean;

  hydrate: () => Promise<void>;
  setTokens: (tokens: { accessToken: string; refreshToken: string }) => Promise<void>;
  clear: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  hydrated: false,

  hydrate: async () => {
    const [accessToken, refreshToken] = await Promise.all([
      secureStorage.get(STORAGE_KEYS.ACCESS_TOKEN),
      secureStorage.get(STORAGE_KEYS.REFRESH_TOKEN),
    ]);

    set({
      accessToken,
      refreshToken,
      hydrated: true,
    });
  },

  setTokens: async ({ accessToken, refreshToken }) => {
    await Promise.all([
      secureStorage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken),
      secureStorage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken),
    ]);

    set({ accessToken, refreshToken });
  },

  clear: async () => {
    await Promise.all([
      secureStorage.remove(STORAGE_KEYS.ACCESS_TOKEN),
      secureStorage.remove(STORAGE_KEYS.REFRESH_TOKEN),
    ]);

    set({
      accessToken: null,
      refreshToken: null,
      hydrated: true,
    });
  },
}));
