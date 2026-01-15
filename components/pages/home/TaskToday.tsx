import { AppBox } from '@/components/common/AppBox';
import { AppButton } from '@/components/common/AppButton';
import { AppText } from '@/components/common/AppText';
import FlexRow from '@/components/common/FlexRow';
import { INDICATOR_COLOR } from '@/constants/theme';
import { Pin, Plus } from 'lucide-react-native';
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
    <AppBox className="gap-1 bg-yellow-50">
      <FlexRow>
        <View className="flex-row items-center gap-1">
          <Pin size={16} color={INDICATOR_COLOR.primary} />
          <AppText.Title>Nhiệm vụ hôm nay</AppText.Title>
        </View>

        <AppButton
          size="sm"
          variant="text"
          prefix={<Plus size={14} color={INDICATOR_COLOR.info} />}
          title="Thêm nhiệm vụ"
          classNameText="text-info-500"
          className="gap-1"
        />
      </FlexRow>

      {/* <AppCheckbox.Group
        name="tasks"
        control={control}
        options={[
          { label: 'Nhiệm vụ 1', value: 'task1' },
          { label: 'Nhiệm vụ 2', value: 'task2' },
          { label: 'Nhiệm vụ 3', value: 'task3' },
        ]}
        className="gap-2"
      /> */}

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
