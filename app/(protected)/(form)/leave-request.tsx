import { AppBox } from '@/components/common/AppBox';
import { AppButton } from '@/components/common/AppButton';
import { AppCheckbox } from '@/components/common/AppCheckbox';
import { AppDatePicker } from '@/components/common/AppDatePicker';
import { AppForm } from '@/components/common/AppForm';
import AppInput from '@/components/common/AppInput';
import { AppRadio } from '@/components/common/AppRadio';
import { AppSelect } from '@/components/common/AppSelect';
import { AppSwitch } from '@/components/common/AppSwitch';
import { AppText } from '@/components/common/AppText';
import { AppUploadFile, FileInfo } from '@/components/common/AppUploadFile';
import FlexRow from '@/components/common/FlexRow';
import AppHeader from '@/components/layout/AppHeader';
import StickyFooter from '@/components/layout/StickyFooter';
import { TabScreenWrapper } from '@/components/layout/TabScreenWrapper';
import { ThemedView } from '@/components/themed-view';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InferType } from 'yup';

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
    interests: yup
      .array()
      .of(yup.string())
      .min(1, 'Chọn ít nhất 1 sở thích')
      .required('Chọn ít nhất 1 sở thích'),
    agree: yup.boolean().oneOf([true], 'Bạn phải đồng ý').required('Bạn phải đồng ý'),
    gender: yup.string().required('Chọn giới tính'),
    birthday: yup.string().required('Chọn ngày sinh'),
    exampleSelect: yup.string().required('Vui lòng chọn một mục'),
  })
  .required();

type LeaveRequestFormData = InferType<typeof loginSchema>;

const LeaveRequest = () => {
  const { id } = useLocalSearchParams();
  const [file, setFile] = useState<FileInfo | null>(null);

  const form = useForm<LeaveRequestFormData>({
    mode: 'onTouched',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      reason: '',
      someSwitch: false,
      interests: [],
      agree: false,
      gender: '',
      birthday: '',
      exampleSelect: '',
    },
  });

  console.log('id', id);

  const handleSubmitForm = (value: LeaveRequestFormData) => {
    if (!file) {
      form.setError('file' as any, {
        type: 'manual',
        message: 'Vui lòng chọn file',
      });
    }
    console.log('submit', value);
  };

  return (
    <ThemedView className="flex-1">
      <AppHeader title="Tạo đơn xin nghỉ" />
      <TabScreenWrapper isTabScreen={false} className="gap-5">
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

          <AppForm.Item name="exampleSelect" label="Ví dụ chọn">
            <AppSelect
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
                { label: 'Option 3', value: '3' },
              ]}
              placeholder="Chọn một mục"
              className="w-full"
            />
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

          <AppForm.Item
            name="birthday"
            label="Ngày sinh"
            rules={{ required: 'Vui lòng chọn ngày sinh' }}
          >
            <AppDatePicker placeholder="Chọn ngày sinh" />
          </AppForm.Item>

          {/* <AppUploadFile
            multiple
            label="Nhiều tài liệu đính kèm"
            value={files}
            onChange={(f) => {
              setFiles(Array.isArray(f) ? f : f ? [f as FileInfo] : null);
              if (f) console.log('File data:', f);
            }}
          /> */}
          <AppUploadFile
            required
            label="Tài liệu đính kèm"
            value={file}
            onChange={(f) => {
              form.clearErrors('file' as any);
              setFile(f as FileInfo | null);
              if (f) console.log('File data:', f);
            }}
            error={(form.formState.errors as Record<string, any>)?.file?.message}
          />
        </AppForm>
      </TabScreenWrapper>
      <StickyFooter>
        <AppButton
          color="primary"
          variant="filled"
          size="xl"
          onPress={form.handleSubmit(handleSubmitForm)}
        >
          Gửi đơn
        </AppButton>
      </StickyFooter>
    </ThemedView>
  );
};

export default LeaveRequest;
