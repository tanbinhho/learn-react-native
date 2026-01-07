import { ScrollView, View } from 'react-native';

export function TabScreenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView>
      <View className="flex-1 px-2.5 pb-20 pt-2.5">{children}</View>
    </ScrollView>
  );
}
