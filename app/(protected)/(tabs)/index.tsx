import { TabScreenWrapper } from '@/components/layout/TabScreenWrapper';
import { GreetingHeader } from '@/components/pages/home/GreetingHeader';
import { TodayShiftCard } from '@/components/pages/home/TodayShiftCard';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <TabScreenWrapper>
        <GreetingHeader />
        <TodayShiftCard />
      </TabScreenWrapper>
    </ThemedView>
  );
}
