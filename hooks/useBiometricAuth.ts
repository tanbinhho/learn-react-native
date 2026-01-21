import { useAppStore } from '@/store/useAppStore';
import { verifyDeviceOwner } from '@/utils';
import { useCallback } from 'react';

/**
 * Hook xác thực sinh trắc học chỉ 1 lần cho đến khi tắt app
 */
export function useBiometricAuth() {
  const { biometricAuthenticated, setBiometricAuthenticated } = useAppStore();

  const authenticate = useCallback(async () => {
    if (biometricAuthenticated) return true;
    const isOwner = await verifyDeviceOwner();
    if (isOwner) {
      setBiometricAuthenticated(true);
      return true;
    }
    return false;
  }, [biometricAuthenticated, setBiometricAuthenticated]);

  return { biometricAuthenticated, authenticate };
}
