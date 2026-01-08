import React from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { Text, View } from 'react-native';
import { Switch } from '../ui/switch';

/* -------------------- Types -------------------- */

type BaseSwitchProps = {
  label?: string;
  isDisabled?: boolean;
  className?: string;
  error?: string | { message?: string };
  size?: 'sm' | 'md' | 'lg';
};

/** Controlled Switch (React Hook Form) */
type ControlledSwitchProps = BaseSwitchProps & {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  value?: never;
  onChange?: never;
};

/** Uncontrolled Switch (standalone) */
type UncontrolledSwitchProps = BaseSwitchProps & {
  value: boolean;
  onChange: (value: boolean) => void;
  name?: never;
  control?: never;
  rules?: never;
};

export type AppSwitchProps = ControlledSwitchProps | UncontrolledSwitchProps;

function isControlled(props: AppSwitchProps): props is ControlledSwitchProps {
  return 'control' in props && props.control !== undefined;
}

/* -------------------- Component -------------------- */

export function AppSwitch(props: AppSwitchProps) {
  if (isControlled(props)) {
    const { name, control, rules, label, isDisabled, className, error, size = 'md' } = props;

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
              <SwitchBase
                value={!!value}
                onChange={onChange}
                label={label}
                isDisabled={isDisabled}
                className={className}
                hasError={!!errorMessage}
                size={size}
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
  const { value, onChange, label, isDisabled, className, error, size = 'md' } = props;
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <View>
      <SwitchBase
        value={value}
        onChange={onChange}
        label={label}
        isDisabled={isDisabled}
        className={className}
        hasError={!!errorMessage}
        size={size}
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

type SwitchBaseProps = {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  isDisabled?: boolean;
  className?: string;
  hasError?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

function SwitchBase({
  value,
  onChange,
  label,
  isDisabled,
  className,
  hasError,
  size = 'md',
}: SwitchBaseProps) {
  return (
    <View className={`flex-row items-center gap-2 ${className || ''}`}>
      <Switch
        value={value}
        onValueChange={onChange}
        disabled={isDisabled}
        size={size}
        className={hasError ? 'border-red-500' : undefined}
      />
      {label && (
        <Text
          style={{
            fontSize: 15,
            color: hasError ? '#ef4444' : '#000',
            opacity: isDisabled ? 0.4 : 1,
          }}
        >
          {label}
        </Text>
      )}
    </View>
  );
}
