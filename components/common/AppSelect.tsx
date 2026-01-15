import { cn } from '@/utils/cn';
import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Text, View } from 'react-native';
import { ChevronDownIcon } from '../ui/icon';
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

export type SelectOption = {
  label: string;
  value: string;
};

interface BaseSelectProps {
  options: SelectOption[];
  placeholder?: string;
  isDisabled?: boolean;
  /** Wrapper className for container */
  className?: string;
  /** Select trigger className for custom UI */
  selectClassName?: string;
  error?: string | { message?: string };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outline' | 'underlined' | 'rounded';
}

/** Controlled Select (React Hook Form) */
interface ControlledSelectProps extends Omit<BaseSelectProps, 'value' | 'onChange'> {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
}

/** Uncontrolled Select (standalone) */
interface UncontrolledSelectProps extends Omit<BaseSelectProps, 'name' | 'control' | 'rules'> {
  value: string;
  onChange: (value: string) => void;
}

export type AppSelectProps = ControlledSelectProps | UncontrolledSelectProps;

function isControlled(props: AppSelectProps): props is ControlledSelectProps {
  return 'control' in props && props.control !== undefined;
}

/* -------------------- Component -------------------- */

export function AppSelect(props: AppSelectProps) {
  const {
    className,
    error,
    size = 'md',
    variant = 'outline',
    options,
    placeholder = 'Select an option',
    isDisabled,
    ...rest
  } = props;

  // If no className, use max-content. If className provided, use it.
  const wrapperClass = className ? className : 'w-fit max-w-full self-start';
  const errorMessage = typeof error === 'string' ? error : error?.message;

  if (isControlled(props)) {
    const { name, control, rules } = props as ControlledSelectProps;
    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error: fieldError } }) => (
          <View className={cn(wrapperClass)}>
            <SelectBase
              value={value || ''}
              onChange={onChange}
              options={options}
              placeholder={placeholder}
              isDisabled={isDisabled}
              hasError={!!(errorMessage || fieldError?.message)}
              size={size}
              variant={variant}
              className={className}
            />
            {(errorMessage || fieldError?.message) && (
              <Text style={{ color: '#ef4444', marginTop: 4, marginLeft: 4, fontSize: 13 }}>
                {errorMessage || fieldError?.message}
              </Text>
            )}
          </View>
        )}
      />
    );
  }

  // Uncontrolled
  const { value, onChange } = props as UncontrolledSelectProps;
  return (
    <View className={cn(wrapperClass)}>
      <SelectBase
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        hasError={!!errorMessage}
        size={size}
        variant={variant}
        className={className}
      />
      {errorMessage && (
        <Text style={{ color: '#ef4444', marginTop: 4, marginLeft: 4, fontSize: 13 }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}

/* -------------------- Base UI -------------------- */

type SelectBaseProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  isDisabled?: boolean;
  hasError?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outline' | 'underlined' | 'rounded';
  className?: string;
};

function SelectBase({
  value,
  onChange,
  options,
  placeholder,
  isDisabled,
  hasError,
  size = 'md',
  variant = 'outline',
  className,
}: SelectBaseProps) {
  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption ? selectedOption.label : '';

  return (
    <Select isDisabled={isDisabled} selectedValue={value} onValueChange={onChange}>
      <SelectTrigger
        size={size}
        variant={variant}
        className={cn('max-w-full self-start', hasError ? 'border-red-500' : undefined, className)}
      >
        <SelectInput placeholder={placeholder} value={displayValue} className="min-w-[80px] px-2" />
        <SelectIcon className="mr-4" as={ChevronDownIcon} />
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
