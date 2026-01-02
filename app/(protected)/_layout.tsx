import { useAuth } from '@/hooks/auth/useAuth';
import { Redirect, Slot, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProtectedLayout() {
  const { isAuthenticated, hydrated } = useAuth();
  const pathname = usePathname();

  if (!hydrated) return null;

  if (!isAuthenticated) {
    const redirect = pathname || '/';
    return <Redirect href={`/login?redirect=${encodeURIComponent(redirect)}`} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
      <Slot />
    </SafeAreaView>
  );
}
