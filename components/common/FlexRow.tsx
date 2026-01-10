import { cn } from '@/utils/cn';
import React from 'react';
import { View } from 'react-native';

interface FlexRowProps {
  className?: string;
  children: React.ReactNode;
}

const FlexRow = ({ children, className }: FlexRowProps) => {
  return (
    <View className={cn('item-center flex-row items-center justify-between', className)}>
      {children}
    </View>
  );
};

export default FlexRow;
