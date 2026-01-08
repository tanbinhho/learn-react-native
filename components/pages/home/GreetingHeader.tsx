import { AppAvatar } from '@/components/common/AppAvatar';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

const GreetingHeader = () => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2.5">
        <AppAvatar src="https://i.pravatar.cc/300" size="lg" showStatus status="online" />
        <View>
          <Text className="text-primary-500">Chào buổi sáng Hồ Tấn Bình</Text>
          <Text>Tuần này bạn đã làm 20 ca rồi!</Text>
        </View>
      </View>
      <Feather name="bell" size={24} color="#09c0ba" />
    </View>
  );
};

export default GreetingHeader;
