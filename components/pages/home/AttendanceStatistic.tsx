import { AppBox } from '@/components/common/AppBox';
import { AppText } from '@/components/common/AppText';
import FlexRow from '@/components/common/FlexRow';
import { Grid, GridItem } from '@/components/common/Grid';
import { INDICATOR_COLOR } from '@/constants/theme';
import { CalendarDays, CircleDollarSign, FileCheck } from 'lucide-react-native';
import React from 'react';

const AttendanceStatistic = () => {
  return (
    <AppBox>
      <AppText.Title>Thống kê</AppText.Title>
      <Grid columns={2} gap={12}>
        <GridItem>
          <AppBox.Info
            className="gap-1"
            icon={<CalendarDays size={18} color={INDICATOR_COLOR.info} />}
          >
            <AppText>Số ca đã làm</AppText>
            <FlexRow>
              <AppText.Title>20</AppText.Title>
              <AppText weight="semibold" color="info">
                Xem tổng quan
              </AppText>
            </FlexRow>
          </AppBox.Info>
        </GridItem>
        <GridItem>
          <AppBox.Success
            className="gap-1"
            icon={<FileCheck size={18} color={INDICATOR_COLOR.success} />}
          >
            <AppText>Công việc hoàn thành</AppText>
            <AppText.Title>20</AppText.Title>
          </AppBox.Success>
        </GridItem>
        <GridItem span={2}>
          <AppBox.Warning
            className="gap-1"
            icon={<CircleDollarSign size={18} color={INDICATOR_COLOR.warning} />}
          >
            <AppText>Lương tích lũy</AppText>
            <FlexRow>
              <AppText.Title>2,760,000</AppText.Title>
              <AppText weight="semibold" color="info">
                Xem tổng quan
              </AppText>
            </FlexRow>
          </AppBox.Warning>
        </GridItem>
      </Grid>
    </AppBox>
  );
};

export default AttendanceStatistic;
