import { AppBox } from '@/components/common/AppBox';
import CardNotification from '@/components/common/CardNotification';
import { ThemedText } from '@/components/themed-text';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

const TodayShiftCard = () => {
  return (
    <AppBox>
      <View className="flex-row items-center justify-between">
        <ThemedText>Ca hôm nay</ThemedText>

        <View className="flex-row items-center justify-between gap-2">
          <Feather name="phone" size={16} color="#687076" />
          <Feather name="message-circle" size={16} color="#687076" />
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <ThemedText type="defaultSemiBold">08:00 - 16:00</ThemedText>
        <ThemedText type="link">Yêu cầu nhanh</ThemedText>
      </View>
      <View className="flex-row items-center gap-2">
        <Feather name="cloud-drizzle" size={16} color="#09c0ba" />
        <ThemedText>Hôm nay trời mưa, nên đi sớm 10 phút</ThemedText>
      </View>
      <CardNotification color="info">
        <ThemedText>
          Còn <ThemedText type="defaultSemiBold">20 phút</ThemedText> nữa là đến giờ checkin. Hãy
          chuẩn bị ngay!
        </ThemedText>
      </CardNotification>
    </AppBox>
  );
};

export default TodayShiftCard;
