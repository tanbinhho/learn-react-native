import { TabScreenWrapper } from '@/components/layout/TabScreenWrapper';
import AttendanceHistory from '@/components/pages/home/AttendanceHistory';
import GreetingHeader from '@/components/pages/home/GreetingHeader';
import QuickActions from '@/components/pages/home/QuickActions';
import TaskToday from '@/components/pages/home/TaskToday';
import TodayShiftCard from '@/components/pages/home/TodayShiftCard';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ThemedView className="flex-1">
      <TabScreenWrapper className="gap-5">
        <GreetingHeader />
        <TodayShiftCard />
        <QuickActions />
        <TaskToday />
        <AttendanceHistory />
      </TabScreenWrapper>
    </ThemedView>
  );
}
