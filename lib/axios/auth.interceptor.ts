import { STORAGE_KEYS } from "@/constants/storageKeys";
import { secureStorage } from "@/utils/secure-storage";
import { AxiosInstance } from "axios";
import { router } from "expo-router";

export const attachAuthInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(async (config) => {
    const token = await secureStorage.get(STORAGE_KEYS.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (res) => res,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = await secureStorage.get(
            STORAGE_KEYS.REFRESH_TOKEN
          );
          const { data } = await api.post("/auth/refresh", {
            refreshToken,
          });

          await secureStorage.set(STORAGE_KEYS.ACCESS_TOKEN, data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          return api(originalRequest);
        } catch {
          await Promise.all([
            secureStorage.remove(STORAGE_KEYS.ACCESS_TOKEN),
            secureStorage.remove(STORAGE_KEYS.REFRESH_TOKEN),
          ]);
          router.replace("/login");
        }
      }

      return Promise.reject(error);
    }
  );
};
