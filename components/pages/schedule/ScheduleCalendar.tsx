import { AppBox } from '@/components/common/AppBox';
import React from 'react';
import { Calendar } from 'react-native-calendars';

const ScheduleCalendar = () => {
  return (
    <AppBox>
      <Calendar hideExtraDays={false} enableSwipeMonths />
    </AppBox>
  );
};

export default ScheduleCalendar;
