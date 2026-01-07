import { cn } from '@/utils/cn';
import React from 'react';
import { View, ViewProps } from 'react-native';

type BoxProps = ViewProps & {
  className?: string;
};

export const AppBox = ({ children, className, style, ...props }: BoxProps) => {
  return (
    <View
      className="rounded-lg border border-black/5 bg-white"
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
      }}
    >
      <View className={cn('rounded-lg p-4', className)} style={style}>
        {children}
      </View>
    </View>
  );
};
