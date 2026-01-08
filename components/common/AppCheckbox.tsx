import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '../ui/checkbox';
import { CheckIcon } from '../ui/icon';

/* -------------------- Single Checkbox Types -------------------- */

type BaseCheckboxProps = {
  label?: string;
  isDisabled?: boolean;
  className?: string;
  error?: string | { message?: string };
  indicatorClassName?: string; // Custom checkbox indicator styling
};

/** Controlled Checkbox (React Hook Form) */
type ControlledCheckboxProps = BaseCheckboxProps & {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  value?: never;
  onChange?: never;
};

/** Uncontrolled Checkbox (standalone) */
type UncontrolledCheckboxProps = BaseCheckboxProps & {
  value: boolean;
  onChange: (checked: boolean) => void;
  name?: never;
  control?: never;
  rules?: never;
};

export type AppCheckboxProps = ControlledCheckboxProps | UncontrolledCheckboxProps;

/* -------------------- Checkbox Group Types -------------------- */

type CheckboxOption = {
  label: string;
  value: string;
};

type BaseCheckboxGroupProps = {
  options: CheckboxOption[];
  isDisabled?: boolean;
  className?: string;
  error?: { message?: string } | string;
};

type ControlledCheckboxGroupProps = BaseCheckboxGroupProps & {
  name: string;
  control: Control<any>;
  rules?: any;
  value?: never;
  onChange?: never;
};

type UncontrolledCheckboxGroupProps = BaseCheckboxGroupProps & {
  value?: string[];
  onChange?: (value: string[]) => void;
};

export type AppCheckboxGroupProps = ControlledCheckboxGroupProps | UncontrolledCheckboxGroupProps;

function isControlled(props: AppCheckboxProps): props is ControlledCheckboxProps {
  return 'control' in props && props.control !== undefined;
}

/* -------------------- Component -------------------- */

export function AppCheckbox(props: AppCheckboxProps) {
  if (isControlled(props)) {
    const { name, control, rules, label, isDisabled, className, error, indicatorClassName } = props;

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
            <View>
              <CheckboxBase
                value={!!value}
                onChange={onChange}
                label={label}
                isDisabled={isDisabled}
                className={className}
                indicatorClassName={indicatorClassName}
                hasError={!!errorMessage}
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
  const { value, onChange, label, isDisabled, className, error, indicatorClassName } = props;
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <View>
      <CheckboxBase
        value={value}
        onChange={onChange}
        label={label}
        isDisabled={isDisabled}
        className={className}
        indicatorClassName={indicatorClassName}
        hasError={!!errorMessage}
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

type CheckboxBaseProps = {
  value: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  isDisabled?: boolean;
  className?: string;
  indicatorClassName?: string;
  hasError?: boolean;
};

function CheckboxBase({
  value,
  onChange,
  label,
  isDisabled,
  className,
  indicatorClassName,
  hasError,
}: CheckboxBaseProps) {
  return (
    <Checkbox isChecked={value} onChange={onChange} isDisabled={isDisabled} className={className}>
      <CheckboxIndicator
        className={
          hasError
            ? 'border-red-500'
            : indicatorClassName ||
              'border-primary-600 data-[checked=true]:border-primary-600 data-[checked=true]:bg-primary-600'
        }
      >
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>

      {label && (
        <CheckboxLabel className={hasError ? 'text-red-500' : undefined}>{label}</CheckboxLabel>
      )}
    </Checkbox>
  );
}

/* -------------------- Checkbox Group Component -------------------- */

function AppCheckboxGroup(props: AppCheckboxGroupProps) {
  // 👉 Trường hợp dùng với React Hook Form
  if ('control' in props) {
    const { name, control, rules, options, isDisabled, className, error } = props;

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value = [], onChange }, fieldState: { error: fieldError } }) => {
          const errorMessage = error
            ? typeof error === 'string'
              ? error
              : error.message
            : fieldError?.message;

          return (
            <View className={className}>
              <CheckboxGroupBase
                value={value}
                onChange={onChange}
                options={options}
                isDisabled={isDisabled}
                hasError={!!errorMessage}
              />
              {errorMessage ? (
                <Text style={{ color: '#ef4444', marginTop: 4, marginLeft: 4, fontSize: 13 }}>
                  {errorMessage}
                </Text>
              ) : null}
            </View>
          );
        }}
      />
    );
  }

  // 👉 Trường hợp dùng độc lập
  const { error, value = [], onChange, className, ...rest } = props;
  const handleChange = onChange ?? ((val: string[]) => {});
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <View className={className}>
      <CheckboxGroupBase
        value={value}
        onChange={handleChange}
        {...rest}
        hasError={!!errorMessage}
      />
      {errorMessage ? (
        <Text style={{ color: '#ef4444', marginTop: 4, marginLeft: 4, fontSize: 13 }}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

/* -------------------- Checkbox Group Base UI -------------------- */

type CheckboxGroupBaseProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options: CheckboxOption[];
  isDisabled?: boolean;
  hasError?: boolean;
};

function CheckboxGroupBase({
  value,
  onChange,
  options,
  isDisabled,
  hasError,
}: CheckboxGroupBaseProps) {
  const handleToggle = (optionValue: string) => (checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <>
      {options.map((option) => (
        <AppCheckbox
          key={option.value}
          value={value.includes(option.value)}
          onChange={handleToggle(option.value)}
          label={option.label}
          isDisabled={isDisabled}
          error={hasError ? ' ' : undefined}
        />
      ))}
    </>
  );
}

/* -------------------- Compound Component Pattern -------------------- */

AppCheckbox.Group = AppCheckboxGroup;
