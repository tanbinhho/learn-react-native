import { AppBox } from '@/components/common/AppBox';
import { ThemedText } from '@/components/themed-text';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

export const TodayShiftCard = () => {
  return (
    <AppBox className="">
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
      <ThemedText>
        <Feather name="cloud-drizzle" size={12} color="#687076" /> Hôm nay trời mưa, nên đi sớm 10
        phút
      </ThemedText>
    </AppBox>
  );
};
