import * as Device from 'expo-device';
import * as LocalAuthentication from 'expo-local-authentication';
import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';

export const getInitials = (name?: string) => {
  if (!name) return '?';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
};

/**
 * Format ISO date string (YYYY-MM-DD) to any format using tokens: YYYY, MM, DD
 * Example: formatDate('2024-01-20', 'DD/MM/YYYY') => '20/01/2024'
 */
export function formatDate(dateStr?: string, format: string = 'DD/MM/YYYY'): string {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  return format.replace(/YYYY/g, year).replace(/MM/g, month).replace(/DD/g, day);
}

export async function requestPushPermissionAndToken() {
  if (!Device.isDevice) {
    console.log('Chỉ hoạt động trên thiết bị thật');
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      console.log('User từ chối notification');
      return null;
    }
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;

  console.log('token', token);

  return token;
}

export async function verifyDeviceOwner(): Promise<boolean> {
  try {
    // Kiểm tra phần cứng và đăng ký sinh trắc học
    const [hasHardware, isEnrolled] = await Promise.all([
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.isEnrolledAsync(),
    ]);

    if (!hasHardware) {
      Alert.alert('Thiết bị không hỗ trợ sinh trắc học');
      return false;
    }

    if (!isEnrolled) {
      Alert.alert('Chưa đăng ký sinh trắc học trên thiết bị');
      return false;
    }

    // Thực hiện xác thực sinh trắc học
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Xác nhận bạn là chủ thiết bị',
      fallbackLabel: 'Dùng mật khẩu',
      cancelLabel: 'Hủy',
      disableDeviceFallback: false,
    });

    if (result.success) {
      return true;
    } else {
      if (result.error) {
        console.log('Biometric error:', result.error);
        Alert.alert('Xác thực thất bại', result.error);
      } else {
        Alert.alert('Xác thực thất bại');
      }
      return false;
    }
  } catch (error: any) {
    console.log('Biometric error:', error);
    Alert.alert('Lỗi xác thực sinh trắc học', error?.message || 'Đã xảy ra lỗi');
    return false;
  }
}
