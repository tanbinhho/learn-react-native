import { AppBox } from '@/components/common/AppBox';
import { AppButton } from '@/components/common/AppButton';
import { AppCheckbox } from '@/components/common/AppCheckbox';
import { AppForm } from '@/components/common/AppForm';
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
  const form = useForm<TaskFormData>();

  return (
    <AppBox className="gap-1 bg-yellow-50">
      <FlexRow>
        <View className="flex-row items-center gap-1">
          <Pin size={16} color={INDICATOR_COLOR.primary} />
          <AppText.Title>Nhiệm vụ hôm nay 123</AppText.Title>
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

      <AppForm form={form}>
        <AppForm.Item name="tasks">
          <AppCheckbox.Group>
            <AppCheckbox checkboxValue="music" label="Âm nhạc" />
            <AppCheckbox checkboxValue="sports" label="Thể thao" />
            <AppCheckbox checkboxValue="travel" label="Du lịch" />
          </AppCheckbox.Group>
        </AppForm.Item>
      </AppForm>

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
