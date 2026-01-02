import { AxiosInstance } from "axios";

export const attachErrorInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    (res) => res,
    (error) => {
      if (__DEV__) {
        console.error("[API ERROR]", error.response?.data || error.message);
      }
      return Promise.reject(error);
    }
  );
};
