import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';

export type ThemeMode = 'system' | 'light' | 'dark';
export type Language = 'vi' | 'en';

export type AppStore = {
  theme: ThemeMode;
  language: Language;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: Language) => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'system',
      language: 'vi',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
      }),
    },
  ),
);
