import { authService } from "@/services/auth.service";
import { setToken } from "@/utils/storage";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLogin = (options?: UseMutationOptions<any, any, any, any>) => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: async (res, variables, context, mutation) => {
      await setToken(res.data.accessToken);
      if (options && options.onSuccess) {
        options.onSuccess(res, variables, context, mutation);
      }
    },
    ...options,
  });
};
