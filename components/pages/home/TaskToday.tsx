import { AppBox } from '@/components/common/AppBox';
import { AppCheckbox } from '@/components/common/AppCheckbox';
import FlexRow from '@/components/common/FlexRow';
import { ThemedText } from '@/components/themed-text';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

type TaskFormData = {
  tasks: string[];
};

const TaskToday = () => {
  const { control } = useForm<TaskFormData>({
    defaultValues: {
      tasks: [],
    },
  });

  return (
    <AppBox className="bg-yellow-50">
      <FlexRow>
        <View className="flex-row items-center gap-2.5">
          <Feather name="check-square" size={16} color="green" />
          <ThemedText>Nhiệm vụ hôm nay</ThemedText>
        </View>
      </FlexRow>

      <AppCheckbox.Group
        name="tasks"
        control={control}
        options={[
          { label: 'Nhiệm vụ 1', value: 'task1' },
          { label: 'Nhiệm vụ 2', value: 'task2' },
          { label: 'Nhiệm vụ 3', value: 'task3' },
        ]}
      />

      {/* 
      <AppRadio.Group
        name="gender"
        control={control}
        options={[
          { label: 'Male', value: 'male' },
          { label: 'Female', value: 'female' },
        ]}
      /> */}

      {/* <AppCheckbox name="checkbox" control={control} label="checkbox" />

      <AppSwitch name="notifications" control={control} label="Enable Notifications" size="lg" />

      <AppSelect
        name="country"
        control={control}
        placeholder="Select your country"
        options={[
          { label: 'Vietnam', value: 'vn' },
          { label: 'United States', value: 'us' },
          { label: 'Japan', value: 'jp' },
          { label: 'South Korea', value: 'kr' },
        ]}
      />

      <Example /> */}
    </AppBox>
  );
};

export default TaskToday;
