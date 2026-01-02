import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useLogin = (options?: UseMutationOptions<any, any, any, any>) => {
  const { setTokens } = useAuthStore();

  return useMutation({
    mutationFn: authService.login,
    ...options,
    onSuccess: async (res, variables, context, mutation) => {
      await setTokens({
        accessToken: res.data.token,
        refreshToken: res.data.token,
      });
      if (options && options.onSuccess) {
        options.onSuccess(res, variables, context, mutation);
      }
    },
  });
};
