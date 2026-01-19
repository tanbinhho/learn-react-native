import React from 'react';
import { View } from 'react-native';

const StickyFooter = ({ children }: { children: React.ReactNode }) => {
  return <View className="border-t border-gray-200 p-2.5">{children}</View>;
};

export default StickyFooter;
