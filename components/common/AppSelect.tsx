import { cn } from '@/utils/cn';
import React from 'react';
import { Pressable, View } from 'react-native';
import { ChevronDownIcon } from '../ui/icon';

import { X } from 'lucide-react-native';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectScrollView,
  SelectTrigger,
} from '../ui/select';

/* -------------------- Types -------------------- */

export interface SelectOption {
  label: string;
  value: string;
}

// Đảm bảo value, onChange, error là optional để AppForm.Item inject tự động

export interface AppSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string | { message?: string };
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
  size?: 'large' | 'middle' | 'small';
}

/* -------------------- Component -------------------- */

export function AppSelect(props: AppSelectProps) {
  const {
    options,
    value = '',
    onChange,
    error,
    placeholder = 'Select an option',
    isDisabled,
    className,
    size = 'middle',
  } = props;
  const sizeStyles: Record<'large' | 'middle' | 'small', { input: string; text: string }> = {
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
  const sizeClass = sizeStyles[size] ?? sizeStyles.middle;
  const hasError = !!error;
  return (
    <Select
      className={cn(
        ' rounded-xl border bg-white text-gray-900 shadow-sm transition-colors',
        sizeClass.input,
        hasError ? 'border-red-500' : 'border-gray-300',
        className,
      )}
      isDisabled={isDisabled}
      selectedValue={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="border- flex-1 flex-row items-center justify-between gap-2">
        <SelectInput
          placeholder={placeholder}
          value={options.find((opt) => opt.value === value)?.label || ''}
          className={cn(
            'px-0 font-medium',
            sizeClass.text,
            value ? 'text-gray-900' : 'text-gray-400',
            !value ? 'min-w-[120px] max-w-[200px]' : '',
          )}
        />
        {/* Nút xóa value dùng icon X của lucide */}
        <View className="flex-row items-center gap-1">
          {value ? (
            <Pressable
              onPress={(e) => {
                e.stopPropagation?.();
                if (onChange) onChange('');
              }}
              className="h-6 w-6 items-center justify-center rounded-full bg-gray-200 active:bg-gray-300"
              hitSlop={8}
              style={{ borderWidth: 0 }}
            >
              <X size={14} color="#888" />
            </Pressable>
          ) : null}
          <SelectIcon as={ChevronDownIcon} />
        </View>
      </SelectTrigger>
      <SelectPortal>
        <SelectBackdrop />
        <SelectContent>
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>
          <SelectScrollView>
            {options.map((option) => (
              <SelectItem key={option.value} label={option.label} value={option.value} />
            ))}
          </SelectScrollView>
        </SelectContent>
      </SelectPortal>
    </Select>
  );
}
