import { AppBox } from '@/components/common/AppBox';
import { Grid } from '@/components/common/Grid';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text } from 'react-native';

type TAction = {
  id: number;
  title: string;
  icon: keyof typeof Feather.glyphMap;
  link?: string;
};

const QuickActions = () => {
  const actions: TAction[] = [
    {
      id: 1,
      icon: 'dollar-sign',
      title: 'Lương',
      link: 'salary',
    },
    {
      id: 2,
      icon: 'trending-up',
      title: 'KPI',
      link: 'kpi',
    },
    {
      id: 3,
      icon: 'calendar',
      title: 'Đặt lịch',
      link: '',
    },
    {
      id: 4,
      icon: 'pie-chart',
      title: 'Báo cáo',
      link: 'report',
    },
    {
      id: 5,
      icon: 'pie-chart',
      title: 'Cải tiến',
      link: 'report',
    },
    {
      id: 6,
      icon: 'home',
      title: 'Nhập hàng',
      link: 'home',
    },
  ];

  return (
    <Grid columns={3} gap={12}>
      {actions.map((item) => (
        <AppBox key={item.id} className="items-center gap-1">
          <Feather name={item.icon} size={24} color="#09c0ba" className="m-auto" />
          <Text className="font-semibold">{item.title}</Text>
        </AppBox>
      ))}
    </Grid>
  );
};

export default QuickActions;
