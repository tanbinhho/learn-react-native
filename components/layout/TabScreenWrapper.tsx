import { cn } from '@/utils/cn';
import { ScrollView, View } from 'react-native';

export function TabScreenWrapper({
  children,
  className,
  isPadding = true,
  isTabScreen = true,
}: {
  children: React.ReactNode;
  className?: string;
  isPadding?: boolean;
  isTabScreen?: boolean;
}) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
      <View
        className={cn(
          `flex-1 ${isTabScreen ? 'pb-20' : 'pb-2.5'} ${isPadding ? 'px-2.5 pt-2.5' : ''}`,
          className,
        )}
      >
        {children}
      </View>
    </ScrollView>
  );
}
