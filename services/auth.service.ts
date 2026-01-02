import { api } from '@/lib/axios/axios.instance';

export const authService = {
  login: (payload: { username: string; password: string }) => api.post('/auth/login', payload),

  profile: () => api.get('/auth/me'),
};
