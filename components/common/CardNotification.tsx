import { cn } from '@/utils/cn';
import React from 'react';
import { View } from 'react-native';

type CardNotificationColors = 'error' | 'warning' | 'success' | 'info' | 'primary';

interface CardNotificationProps {
  children: React.ReactNode;
  color?: CardNotificationColors;
  className?: string;
}

const CardNotification = ({ children, color = 'primary', className }: CardNotificationProps) => {
  const styleCard: Record<CardNotificationColors, string> = {
    primary: 'border-[#09c0ba] bg-[#09c0ba]/5',
    error: 'border-red-600 bg-red-50',
    success: 'border-green-600 bg-green-50',
    warning: 'border-yellow-500 bg-yellow-50 ',
    info: 'border-blue-600 bg-blue-50',
  };

  return (
    <View className={cn('rounded-lg border-l-2 p-2.5', styleCard[color], className)}>
      {children}
    </View>
  );
};

export default CardNotification;
