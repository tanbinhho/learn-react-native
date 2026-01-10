import { AppAvatar } from '@/components/common/AppAvatar';
import { AppText } from '@/components/common/AppText';
import { Bell } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

const GreetingHeader = () => {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2.5">
        <AppAvatar src="https://i.pravatar.cc/300" size="lg" showStatus status="online" />
        <View>
          <AppText.Label color="primary">Chào buổi sáng Hồ Tấn Bình</AppText.Label>
          <AppText>Tuần này bạn đã làm 20 ca rồi!</AppText>
        </View>
      </View>
      <Bell size={24} color="#09c0ba" />
    </View>
  );
};

export default GreetingHeader;
