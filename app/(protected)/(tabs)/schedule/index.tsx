import { AppActionSheet } from '@/components/common/AppActionSheet';
import AppHeader from '@/components/layout/AppHeader';
import { TabScreenWrapper } from '@/components/layout/TabScreenWrapper';
import ScheduleCalendar from '@/components/pages/schedule/ScheduleCalendar';
import ScheduleStatistic from '@/components/pages/schedule/ScheduleStatistic';
import TimesheetHistory from '@/components/pages/schedule/TimesheetHistory';
import { ThemedView } from '@/components/themed-view';
import { useAppActionSheet } from '@/hooks/useAppActionSheet';
import { router } from 'expo-router';
import {
  CalendarArrowUp,
  CalendarClock,
  CalendarDays,
  CalendarSync,
  CalendarX,
  CircleDollarSign,
  Clock,
  EllipsisVertical,
  Lightbulb,
} from 'lucide-react-native';
import { View } from 'react-native';

export default function ScheduleScreen() {
  const { sheetProps, present } = useAppActionSheet();

  const openSheet = () =>
    present({
      actions: [
        {
          key: '1',
          label: 'Đăng ký ca làm',
          icon: <CalendarDays size={18} />,
          onPress: () =>
            router.push({
              pathname: '/(protected)/(form)/shift-registration',
              params: { fromTab: 'schedule' },
            }),
        },
        {
          key: '2',
          label: 'Đơn xin nghỉ',
          icon: <CalendarX size={18} />,
          onPress: () =>
            router.push({
              pathname: '/(protected)/(form)/leave-request',
              params: { fromTab: 'schedule' },
            }),
        },
        {
          key: '3',
          label: 'Tăng ca',
          icon: <CalendarArrowUp size={18} />,
          onPress: () =>
            router.push({
              pathname: '/(protected)/(form)/overtime-request',
              params: { fromTab: 'schedule' },
            }),
        },
        {
          key: '4',
          label: 'Đổi ca',
          icon: <CalendarSync size={18} />,
          onPress: () =>
            router.push({
              pathname: '/(protected)/(form)/shift-swap',
              params: { fromTab: 'schedule' },
            }),
        },
        {
          key: '5',
          label: 'Đi muộn, về sớm',
          icon: <CalendarClock size={18} />,
          onPress: () =>
            router.push({
              pathname: '/(protected)/(form)/late-early-request',
              params: { fromTab: 'schedule' },
            }),
        },
        {
          key: '6',
          label: 'Tạm ứng lương',
          icon: <CircleDollarSign size={18} />,
          onPress: () =>
            router.push({
              pathname: '/(protected)/(form)/salary-advance',
              params: { fromTab: 'schedule' },
            }),
        },
        {
          key: '7',
          label: 'Đề xuất',
          icon: <Lightbulb size={18} />,
          // onPress: () => router.push({ pathname: '/(protected)/(form)/proposal', params: { fromTab: 'schedule' } }),
        },
      ],
    });

  return (
    <>
      <ThemedView className="flex-1">
        <AppHeader
          title="Lịch ca"
          right={
            <View className="flex-row items-center gap-2.5">
              <Clock size={24} />
              <EllipsisVertical size={24} onPress={openSheet} />
            </View>
          }
        />
        <TabScreenWrapper className="gap-5">
          <ScheduleStatistic />
          <ScheduleCalendar />
          <TimesheetHistory />
        </TabScreenWrapper>
      </ThemedView>
      <AppActionSheet {...sheetProps} />
    </>
  );
}
