import { AppAvatar } from '@/components/common/AppAvatar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export const GreetingHeader = () => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2.5">
        <AppAvatar src="https://i.pravatar.cc/300" size="lg" showStatus status="online" />
        <View>
          <Text>Chào buổi sáng Hồ Tấn Bình</Text>
          <Text>Tuần này bạn đã làm 20 ca rồi!</Text>
        </View>
      </View>
      <Ionicons name="alarm-outline" size={24} color="#09c0ba" />
    </View>
  );
};
