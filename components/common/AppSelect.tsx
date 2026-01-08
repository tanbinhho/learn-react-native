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

type BaseSelectProps = {
  options: SelectOption[];
  placeholder?: string;
  isDisabled?: boolean;
  className?: string;
  error?: string | { message?: string };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'outline' | 'underlined' | 'rounded';
};

/** Controlled Select (React Hook Form) */
type ControlledSelectProps = BaseSelectProps & {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  value?: never;
  onChange?: never;
};

/** Uncontrolled Select (standalone) */
type UncontrolledSelectProps = BaseSelectProps & {
  value: string;
  onChange: (value: string) => void;
  name?: never;
  control?: never;
  rules?: never;
};

export type AppSelectProps = ControlledSelectProps | UncontrolledSelectProps;

function isControlled(props: AppSelectProps): props is ControlledSelectProps {
  return 'control' in props && props.control !== undefined;
}

/* -------------------- Component -------------------- */

export function AppSelect(props: AppSelectProps) {
  if (isControlled(props)) {
    const {
      name,
      control,
      rules,
      options,
      placeholder = 'Select an option',
      isDisabled,
      className,
      error,
      size = 'md',
      variant = 'outline',
    } = props;

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error: fieldError } }) => {
          const errorMessage = error
            ? typeof error === 'string'
              ? error
              : error.message
            : fieldError?.message;

          return (
            <View className={className}>
              <SelectBase
                value={value || ''}
                onChange={onChange}
                options={options}
                placeholder={placeholder}
                isDisabled={isDisabled}
                hasError={!!errorMessage}
                size={size}
                variant={variant}
              />
              {errorMessage && (
                <Text
                  style={{
                    color: '#ef4444',
                    marginTop: 4,
                    marginLeft: 4,
                    fontSize: 13,
                  }}
                >
                  {errorMessage}
                </Text>
              )}
            </View>
          );
        }}
      />
    );
  }

  // Uncontrolled
  const {
    value,
    onChange,
    options,
    placeholder = 'Select an option',
    isDisabled,
    className,
    error,
    size = 'md',
    variant = 'outline',
  } = props;
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <View className={className}>
      <SelectBase
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        isDisabled={isDisabled}
        hasError={!!errorMessage}
        size={size}
        variant={variant}
      />
      {errorMessage && (
        <Text
          style={{
            color: '#ef4444',
            marginTop: 4,
            marginLeft: 4,
            fontSize: 13,
          }}
        >
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
}: SelectBaseProps) {
  return (
    <Select isDisabled={isDisabled} selectedValue={value} onValueChange={onChange}>
      <SelectTrigger
        size={size}
        variant={variant}
        className={hasError ? 'border-red-500' : undefined}
      >
        <SelectInput placeholder={placeholder} />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
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
