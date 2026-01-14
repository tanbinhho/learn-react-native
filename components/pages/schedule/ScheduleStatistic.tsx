import { AppBox } from '@/components/common/AppBox';
import { AppText } from '@/components/common/AppText';
import FlexRow from '@/components/common/FlexRow';
import React from 'react';

const DATA = [
  { label: 'Số lần đi trễ / về sớm', value: 2 },
  { label: 'Nghỉ đột xuất', value: 1 },
  { label: 'Tăng ca / đổi ca', value: 1 },
  { label: 'Tạm ứng lương / đề xuất', value: 3 },
];

const ScheduleStatistic = () => {
  return (
    <AppBox>
      <AppText.Title>Thống kê</AppText.Title>
      {DATA.map((item, index) => (
        <FlexRow key={index} className="py-1">
          <AppText>{item.label}</AppText>
          <AppText>{item.value}</AppText>
        </FlexRow>
      ))}
    </AppBox>
  );
};

export default ScheduleStatistic;
