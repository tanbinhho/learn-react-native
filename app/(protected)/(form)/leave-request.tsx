import { AppBox } from '@/components/common/AppBox';
import { AppButton } from '@/components/common/AppButton';
import { AppCheckbox } from '@/components/common/AppCheckbox';
import { AppForm } from '@/components/common/AppForm';
import AppInput from '@/components/common/AppInput';
import { AppRadio } from '@/components/common/AppRadio';
import { AppSwitch } from '@/components/common/AppSwitch';
import { AppText } from '@/components/common/AppText';
import FlexRow from '@/components/common/FlexRow';
import AppHeader from '@/components/layout/AppHeader';
import { TabScreenWrapper } from '@/components/layout/TabScreenWrapper';
import { ThemedView } from '@/components/themed-view';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const DATA = [
  { label: 'Nghỉ có lương / phép năm', value: 2 },
  { label: 'Nghỉ không lương', value: 1 },
  { label: 'Nghỉ đột xuất', value: 1 },
  { label: 'Tổng xin nghỉ', value: 3 },
];

const loginSchema = yup
  .object({
    reason: yup.string().required('Reason is required'),
    someSwitch: yup.boolean().required('This field is required'),
    interests: yup.array().of(yup.string()).min(1, 'Chọn ít nhất 1 sở thích'),
    agree: yup.boolean().oneOf([true], 'Bạn phải đồng ý'),
    gender: yup.string().required('Chọn giới tính'),
  })
  .required();

const LeaveRequest = () => {
  const { id } = useLocalSearchParams();

  const form = useForm({
    mode: 'onTouched',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      reason: '',
      someSwitch: false,
      interests: [],
      agree: false,
      gender: '',
    },
  });

  console.log('id', id);

  return (
    <ThemedView className="flex-1">
      <AppHeader title="Tạo đơn xin nghỉ" />
      <TabScreenWrapper className="gap-5">
        <AppBox.Primary>
          {DATA.map((item, index) => (
            <FlexRow key={index} className="py-1">
              <AppText>{item.label}</AppText>
              <AppText>{item.value}</AppText>
            </FlexRow>
          ))}
        </AppBox.Primary>
        <AppForm form={form}>
          <AppForm.Item name="reason" label="Lý do nghỉ">
            <AppInput placeholder="Nhập lý do nghỉ" autoCapitalize="none" autoCorrect={false} />
          </AppForm.Item>
          <AppForm.Item name="someSwitch" label="Lý do nghỉ">
            <AppSwitch />
          </AppForm.Item>

          {/* Checkbox group: interests (array of string) */}
          <AppForm.Item name="interests" label="Sở thích">
            <AppCheckbox.Group>
              <AppCheckbox checkboxValue="music" label="Âm nhạc" />
              <AppCheckbox checkboxValue="sports" label="Thể thao" />
              <AppCheckbox checkboxValue="travel" label="Du lịch" />
            </AppCheckbox.Group>
          </AppForm.Item>

          {/* Single checkbox: agree (boolean) */}
          <AppForm.Item name="agree">
            <AppCheckbox label="Tôi đồng ý với điều khoản" />
          </AppForm.Item>

          <AppForm.Item name="gender" label="Gender">
            <AppRadio.Group>
              <AppRadio radioValue="male" label="Male" />
              <AppRadio radioValue="female" label="Female" />
              <AppRadio radioValue="other" label="Other" />
            </AppRadio.Group>
          </AppForm.Item>

          <AppButton
            onPress={form.handleSubmit((data) => {
              // handle submit
              console.log('submit', data);
            })}
          >
            Gửi đơn
          </AppButton>
        </AppForm>
      </TabScreenWrapper>
    </ThemedView>
  );
};

export default LeaveRequest;
