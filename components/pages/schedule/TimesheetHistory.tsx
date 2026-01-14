import { AppBox } from '@/components/common/AppBox';
import { AppSelect, SelectOption } from '@/components/common/AppSelect';
import { AppTag } from '@/components/common/AppTag';
import { AppText } from '@/components/common/AppText';
import CardNotification from '@/components/common/CardNotification';
import FlexRow from '@/components/common/FlexRow';
import { Divider } from '@/components/ui/divider';
import React from 'react';
import { Text, View } from 'react-native';
import { AttendanceTimeline } from './AttendanceTimeline';

const TimesheetHistory = () => {
  const timeOption: SelectOption[] = [
    { label: '7 ngày', value: 'week' },
    { label: '1 tháng', value: 'month' },
    { label: '3 tháng', value: 'quarter' },
  ];
  return (
    <>
      <AppText.Title>Hôm nay</AppText.Title>
      <CardNotification color="warning">
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
      </CardNotification>
      <Divider />
      <AppBox>
        <FlexRow>
          <AppText.Label>Lịch sử chấm công</AppText.Label>
          <AppSelect
            placeholder="Chọn ngày"
            value="week"
            onChange={() => console.log(1)}
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
