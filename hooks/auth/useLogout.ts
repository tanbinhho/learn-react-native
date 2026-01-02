import { queryClient } from "@/lib/react-query/queryClient";
import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";

export const useLogout = () => {
  const { clear } = useAuthStore();

  return async () => {
    await clear();
    queryClient.clear();
    router.replace("/login");
  };
};
