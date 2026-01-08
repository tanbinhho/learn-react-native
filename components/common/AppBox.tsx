import { cn } from '@/utils/cn';
import React from 'react';
import { View, ViewProps } from 'react-native';

type BoxProps = ViewProps & {
  className?: string;
  contentClassName?: string;
};

export const AppBox = ({ children, className, style, contentClassName, ...props }: BoxProps) => {
  return (
    <View
      className={cn('rounded-lg border border-black/5 bg-white', className)}
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2,
      }}
    >
      <View className={cn('rounded-lg p-4', contentClassName)} style={style}>
        {children}
      </View>
    </View>
  );
};
