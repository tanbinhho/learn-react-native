import { useAuthStore } from '@/store/useAuthStore';

export const useAuth = () => {
  const { accessToken, hydrated } = useAuthStore();

  return {
    isAuthenticated: !!accessToken,
    hydrated,
  };
};
