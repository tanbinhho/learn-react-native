import { AppBox } from '@/components/common/AppBox';
import { AppButton } from '@/components/common/AppButton';
import { AppDatePicker } from '@/components/common/AppDatePicker';
import { AppForm } from '@/components/common/AppForm';
import AppInput from '@/components/common/AppInput';
import { AppSelect } from '@/components/common/AppSelect';
import { AppText } from '@/components/common/AppText';
import { AppUploadFile, FileInfo } from '@/components/common/AppUploadFile';
import { AppUploadImages } from '@/components/common/AppUploadImages';
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
    reason: yup.string().required('Vui lòng điền lý do nghỉ'),
    time: yup.string().required('Vui lòng chọn thời gian nghỉ'),
    type: yup.string().required('Vui lòng chọn loại nghỉ'),
    images: yup
      .array()
      .of(yup.string())
      .required('Vui lòng chọn hình ảnh')
      .min(1, 'Vui lòng chọn ít nhất 1 hình ảnh'),
  })
  .required();

type LeaveRequestFormData = InferType<typeof loginSchema>;

const LeaveRequest = () => {
  const { id } = useLocalSearchParams();
  const [file, setFile] = useState<FileInfo | null>(null);

  const form = useForm<LeaveRequestFormData>({
    mode: 'onChange',
    resolver: yupResolver(loginSchema),
    defaultValues: {
      reason: '',
      time: '',
      type: '',
      images: [],
      // someSwitch: false,
      // interests: [],
      // agree: false,
      // gender: '',
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
          <AppForm.Item name="time" label="Thời gian nghỉ" required>
            <AppDatePicker placeholder="Chọn thời gian nghỉ" />
          </AppForm.Item>

          <AppForm.Item name="type" label="Loại nghỉ" required>
            <AppSelect
              options={[
                { label: 'Nghỉ có lương / phép năm', value: '1' },
                { label: 'Nghỉ không lương', value: '2' },
                { label: 'Khác', value: '3' },
              ]}
              placeholder="Chọn loại nghỉ"
              className="w-full"
            />
          </AppForm.Item>

          <AppForm.Item name="reason" label="Lý do nghỉ" required>
            <AppInput.Textarea
              placeholder="Nhập lý do nghỉ"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </AppForm.Item>

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

          <AppForm.Item name="images" label="Hình ảnh" required>
            <AppUploadImages />
          </AppForm.Item>

          {/* 
          <AppForm.Item name="interests" label="Sở thích">
            <AppCheckbox.Group>
              <AppCheckbox checkboxValue="music" label="Âm nhạc" />
              <AppCheckbox checkboxValue="sports" label="Thể thao" />
              <AppCheckbox checkboxValue="travel" label="Du lịch" />
            </AppCheckbox.Group>
          </AppForm.Item>

          <AppForm.Item name="interests" label="Sở thích">
            <AppCheckbox.Group className="flex-row gap-2.5">
              <AppCheckbox.Tag checkboxValue="music" label="Âm nhạc" />
              <AppCheckbox.Tag checkboxValue="sports" label="Thể thao" />
              <AppCheckbox.Tag checkboxValue="travel" label="Du lịch" />
            </AppCheckbox.Group>
          </AppForm.Item>

          <AppForm.Item name="someSwitch" label="Lý do nghỉ">
            <AppSwitch />
          </AppForm.Item>

          <AppForm.Item name="agree">
            <AppCheckbox label="Tôi đồng ý với điều khoản" />
          </AppForm.Item>

          <AppForm.Item name="gender" label="Gender">
            <AppRadio.Group>
              <AppRadio radioValue="male" label="Male" />
              <AppRadio radioValue="female" label="Female" />
              <AppRadio radioValue="other" label="Other" />
            </AppRadio.Group>
          </AppForm.Item> */}

          {/* <AppUploadFile
            multiple
            label="Nhiều tài liệu đính kèm"
            value={files}
            onChange={(f) => {
              setFiles(Array.isArray(f) ? f : f ? [f as FileInfo] : null);
              if (f) console.log('File data:', f);
            }}
          /> */}
        </AppForm>
      </TabScreenWrapper>
      <StickyFooter>
        <AppButton
          color="info"
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
