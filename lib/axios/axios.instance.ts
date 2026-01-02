import axios from 'axios';
import { attachAuthInterceptor } from './auth.interceptor';
import { attachErrorInterceptor } from './error.interceptor';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

attachAuthInterceptor(api);
attachErrorInterceptor(api);
