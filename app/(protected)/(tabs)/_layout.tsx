import { CustomTabBar } from '@/components/layout/CustomTabBar';
import { requestPushPermissionAndToken } from '@/utils';
import { Tabs } from 'expo-router';
import { useEffect } from 'react';

export default function TabLayout() {
  useEffect(() => {
    (async () => {
      const token = await requestPushPermissionAndToken();
      console.log('Expo Push Token:', token);
    })();
  }, []);

  return (
    <Tabs
      screenOptions={{ headerShown: false, lazy: true }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="schedule" />
      <Tabs.Screen name="chat" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
