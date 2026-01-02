import { QUERY_KEYS } from '@/constants/queryKeys';
import { authService } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';

export const useProfile = () => {
  return useQuery({
    queryKey: QUERY_KEYS.profile,
    queryFn: () => authService.profile().then((res) => res.data),
  });
};
