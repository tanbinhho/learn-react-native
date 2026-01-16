import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Calendar, DateObject } from 'react-native-calendars';
import AppModal from './AppModal';

type AppDatePickerSize = 'large' | 'middle' | 'small';

const sizeStyles: Record<AppDatePickerSize, { input: string; text: string }> = {
  large: {
    input: 'min-h-[56px] px-4 text-base',
    text: 'text-base',
  },
  middle: {
    input: 'min-h-[48px] px-4 text-sm',
    text: 'text-sm',
  },
  small: {
    input: 'min-h-[40px] px-3 text-sm',
    text: 'text-sm',
  },
};

export interface AppDatePickerProps {
  size?: AppDatePickerSize;
  value?: string; // ISO date string: 'YYYY-MM-DD'
  onChange?: (date: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  minDate?: string;
  maxDate?: string;
  className?: string;
}

export const AppDatePicker: React.FC<AppDatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Chọn ngày',
  error,
  disabled,
  minDate,
  maxDate,
  className,
  size = 'middle',
}) => {
  const [show, setShow] = React.useState(false);
  const sizeClass = sizeStyles[size] ?? sizeStyles.middle;
  // import AppModal nếu chưa có
  // import { AppModal } from '@/components/common/AppModal';

  return (
    <View className={className}>
      {label && <Text className="mb-1 font-semibold text-gray-900">{label}</Text>}
      <Pressable
        onPress={() => setShow(true)}
        disabled={disabled}
        className={`flex-row items-center gap-2 rounded-xl border bg-white text-gray-900 shadow-sm transition-colors ${sizeClass.input} ${error ? 'border-red-500' : 'border-gray-300'} ${disabled ? 'opacity-50' : ''}`}
      >
        <Text
          className={
            value
              ? `font-medium text-gray-900 ${sizeClass.text}`
              : `font-medium text-gray-400 ${sizeClass.text}`
          }
        >
          {value ? value : placeholder}
        </Text>
      </Pressable>
      {/* Calendar hiển thị trong modal */}
      {show && (
        <AppModal open={show} onClose={() => setShow(false)}>
          <Calendar
            current={value}
            minDate={minDate}
            maxDate={maxDate}
            onDayPress={(day: DateObject) => {
              setShow(false);
              if (onChange) onChange(day.dateString);
            }}
            markedDates={value ? { [value]: { selected: true } } : undefined}
          />
        </AppModal>
      )}
    </View>
  );
};
