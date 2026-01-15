import { AppBox } from '@/components/common/AppBox';
import { AppSelect, SelectOption } from '@/components/common/AppSelect';
import { AppTag } from '@/components/common/AppTag';
import { AppText } from '@/components/common/AppText';
import CardNotification from '@/components/common/CardNotification';
import FlexRow from '@/components/common/FlexRow';
import { Divider } from '@/components/ui/divider';
import { INDICATOR_COLOR } from '@/constants/theme';
import { Sun } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { AttendanceTimeline } from './AttendanceTimeline';

const TimesheetHistory = () => {
  const [timeSelect, setTimeSelect] = React.useState<string>('week');
  const timeOption: SelectOption[] = [
    { label: '7 ngày', value: 'week' },
    { label: '1 tháng', value: 'month' },
    { label: '3 tháng', value: 'quarter' },
  ];
  return (
    <>
      <AppText.Title>Hôm nay</AppText.Title>
      <CardNotification color="warning">
        <View className="flex-row items-start gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-warning-100">
            <Sun size={18} color={INDICATOR_COLOR.warning} />
          </View>
          <View className="flex-1">
            <FlexRow>
              <AppText.Title>Ca sáng</AppText.Title>
              <AppTag variant="solid" color="primary" size="sm">
                08:00 - 15:00
              </AppTag>
            </FlexRow>
            <AppText.Caption variant="label">
              Nhân viên: <AppText.Label>Hồ Tấn Bình</AppText.Label>
            </AppText.Caption>
            <FlexRow>
              <AppText.Caption variant="label">
                Chấm công: <AppText.Label>08:00 - --:--</AppText.Label>
              </AppText.Caption>
              <AppTag variant="solid" color="info" shape="pill" size="sm">
                Đang làm
              </AppTag>
            </FlexRow>
          </View>
        </View>
      </CardNotification>
      <Divider />
      <AppBox>
        <FlexRow className="mb-2.5">
          <AppText.Label>Lịch sử chấm công</AppText.Label>
          <AppSelect
            size="sm"
            placeholder="Chọn ngày"
            value={timeSelect}
            onChange={setTimeSelect}
            options={timeOption}
          />
        </FlexRow>
        <AttendanceTimeline
          data={[
            {
              id: '1',
              title: <Text className="font-semibold">Thứ 2 - 02/06/2025</Text>,
              description: (
                <View>
                  <Text className="text-sm text-gray-600">Đã chấm công vào lúc 09:00</Text>
                  <Text className="mt-1 text-sm text-blue-600">Lý do đi trễ</Text>
                </View>
              ),
            },
            {
              id: '2',
              title: <Text className="font-semibold">Thứ 2 - 02/06/2025</Text>,
              description: (
                <View>
                  <Text className="text-sm text-gray-600">Đã chấm công vào lúc 09:00</Text>
                  <Text className="mt-1 text-sm text-blue-600">Lý do đi trễ</Text>
                </View>
              ),
            },
            {
              id: '3',
              title: <Text className="font-semibold">Thứ 2 - 02/06/2025</Text>,
              description: (
                <View>
                  <Text className="text-sm text-gray-600">Đã chấm công vào lúc 09:00</Text>
                  <Text className="mt-1 text-sm text-blue-600">Lý do đi trễ</Text>
                </View>
              ),
            },
          ]}
        />
      </AppBox>
    </>
  );
};

export default TimesheetHistory;
