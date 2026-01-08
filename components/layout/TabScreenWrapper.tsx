import { cn } from '@/utils/cn';
import { ScrollView, View } from 'react-native';

export function TabScreenWrapper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View className={cn('flex-1 px-2.5 pb-20 pt-2.5', className)}>{children}</View>
    </ScrollView>
  );
}
