import { AppBox } from '@/components/common/AppBox';
import FlexRow from '@/components/common/FlexRow';
import { ThemedText } from '@/components/themed-text';
import React from 'react';
import { View } from 'react-native';

const TaskToday = () => {
  return (
    <AppBox className="bg-yellow-50">
      <FlexRow>
        <View>
          <ThemedText>Nhiệm vụ hôm nay</ThemedText>
        </View>
      </FlexRow>
      <ThemedText>Nhiệm vụ hôm nay</ThemedText>
      <ThemedText>Nhiệm vụ hôm nay</ThemedText>
      <ThemedText>Nhiệm vụ hôm nay</ThemedText>
      <ThemedText>Nhiệm vụ hôm nay</ThemedText>
    </AppBox>
  );
};

export default TaskToday;
