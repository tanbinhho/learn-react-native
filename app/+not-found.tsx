import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6 dark:bg-neutral-900">
      <View className="mb-8 items-center">
        <View className="mb-4 rounded-full bg-red-100 p-4 dark:bg-red-900">
          <Text className="text-4xl font-bold text-red-500 dark:text-red-400">404</Text>
        </View>
        <Text className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Page Not Found
        </Text>
        <Text className="mb-4 max-w-xs text-center text-base text-gray-500 dark:text-gray-300">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </Text>
      </View>
      <Link href="/" asChild>
        <Text className="rounded-full bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-md active:opacity-80">
          Go Home
        </Text>
      </Link>
    </View>
  );
}
