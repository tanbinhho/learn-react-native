import { AppBox } from '@/components/common/AppBox';
import { AppText } from '@/components/common/AppText';
import { Grid } from '@/components/common/Grid';
import { INDICATOR_COLOR } from '@/constants/theme';
import { useAppToast } from '@/hooks/useAppToast';
import {
  CalendarDays,
  ChartColumnBig,
  ChartNoAxesCombined,
  CircleDollarSign,
  LucideIcon,
  Rocket,
  Store,
} from 'lucide-react-native';
import React from 'react';
import { Pressable } from 'react-native';

type TAction = {
  id: number;
  title: string;
  icon: LucideIcon;
  link?: string;
};

const QuickActions = () => {
  const toast = useAppToast();

  const handleActionPress = (action: TAction) => {
    toast.show({
      title: 'Thông báo',
      description: 'Tính năng đang phát triển',
      variant: 'info',
      duration: 2000,
    });
  };

  const actions: TAction[] = [
    {
      id: 1,
      icon: CircleDollarSign,
      title: 'Lương',
      link: 'salary',
    },
    {
      id: 2,
      icon: ChartNoAxesCombined,
      title: 'KPI',
      link: 'kpi',
    },
    {
      id: 3,
      icon: CalendarDays,
      title: 'Đặt lịch',
      link: '',
    },
    {
      id: 4,
      icon: ChartColumnBig,
      title: 'Báo cáo',
      link: 'report',
    },
    {
      id: 5,
      icon: Rocket,
      title: 'Cải tiến',
      link: 'report',
    },
    {
      id: 6,
      icon: Store,
      title: 'Nhập hàng',
      link: 'home',
    },
  ];

  return (
    <Grid columns={3} gap={12}>
      {actions.map((item) => {
        const Icon = item.icon;

        return (
          <Pressable key={item.id} onPress={() => handleActionPress(item)}>
            <AppBox contentClassName="items-center gap-1">
              <Icon size={26} color={INDICATOR_COLOR.primary} className="w-max" />
              <AppText weight="semibold">{item.title}</AppText>
            </AppBox>
          </Pressable>
        );
      })}
    </Grid>
  );
};

export default QuickActions;
