import { clearToken, getToken, setToken } from "@/utils/storage";
import { AxiosInstance } from "axios";
import { router } from "expo-router";

export const attachAuthInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use(async (config) => {
    const token = await getToken();
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
          const refreshToken = await getToken("refresh");
          const { data } = await api.post("/auth/refresh", {
            refreshToken,
          });

          await setToken(data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

          return api(originalRequest);
        } catch {
          await clearToken();
          router.replace("/login");
        }
      }

      return Promise.reject(error);
    }
  );
};
