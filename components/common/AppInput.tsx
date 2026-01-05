import { Input, InputField, InputSlot } from '@/components/ui/input';
import { clsx } from 'clsx';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Text, TextInputProps, TouchableOpacity } from 'react-native';

/**
 * AppInput supports both controlled (react-hook-form) and uncontrolled usage.
 * If control and name are provided, it will use Controller.
 */
type AppInputSize = 'large' | 'middle' | 'small';

type AppInputProps = TextInputProps & {
  name?: string;
  control?: any;
  rules?: any;
  defaultValue?: any;
  error?: { message?: string } | string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: AppInputSize;
  className?: string;
  inputFieldClassName?: string;
  passwordToggle?: {
    isVisible: boolean;
    onToggle: () => void;
    icon?: (isVisible: boolean) => React.ReactNode;
  };
};

const sizeStyles: Record<AppInputSize, { input: string; field: string; slot: string }> = {
  large: {
    input: 'min-h-[56px] px-5 text-base',
    field: 'text-base',
    slot: 'text-base',
  },
  middle: {
    input: 'min-h-[48px] px-4 text-[15px]',
    field: 'text-[15px]',
    slot: 'text-[15px]',
  },
  small: {
    input: 'min-h-[40px] px-3 text-sm',
    field: 'text-sm',
    slot: 'text-sm',
  },
};

function BaseAppInput({
  name,
  control,
  rules,
  defaultValue = '',
  error,
  prefix,
  suffix,
  size = 'middle',
  className,
  inputFieldClassName,
  placeholder = 'Search...',
  secureTextEntry,
  passwordToggle,
  ...inputProps
}: AppInputProps) {
  const errorMessage = typeof error === 'string' ? error : error?.message;
  const borderClass = errorMessage ? 'border border-red-500' : 'border border-gray-300';
  const sizeClass = sizeStyles[size] ?? sizeStyles.middle;
  const inputClassName = clsx(
    'rounded-xl bg-[rgba(255,255,255,0.06)] text-white shadow-sm flex-row items-center gap-2 border transition-colors',
    sizeClass.input,
    borderClass,
    className,
  );
  const fieldClassName = clsx(
    'flex-1 text-white placeholder:text-[#cbd6ff] font-medium',
    sizeClass.field,
    inputFieldClassName,
  );
  const slotClassName = clsx('opacity-90 text-white', sizeClass.slot);
  const resolvedSecureEntry = passwordToggle ? !passwordToggle.isVisible : secureTextEntry;
  const resolvedSuffix =
    suffix ??
    (passwordToggle ? (
      <TouchableOpacity onPress={passwordToggle.onToggle} activeOpacity={0.7}>
        {passwordToggle.icon ? (
          passwordToggle.icon(passwordToggle.isVisible)
        ) : (
          <Text style={{ color: '#cfe3ff', fontSize: 12, fontWeight: '600' }}>
            {passwordToggle.isVisible ? 'Hide' : 'Show'}
          </Text>
        )}
      </TouchableOpacity>
    ) : null);

  // Controlled (react-hook-form)
  if (control && name) {
    return (
      <>
        <Controller
          control={control}
          name={name}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Input className={inputClassName}>
              {prefix && <InputSlot className={clsx('pl-3', slotClassName)}>{prefix}</InputSlot>}
              <InputField
                ref={ref}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                secureTextEntry={resolvedSecureEntry}
                className={fieldClassName}
                {...inputProps}
              />
              {resolvedSuffix && (
                <InputSlot className={clsx('pr-3', slotClassName)}>{resolvedSuffix}</InputSlot>
              )}
            </Input>
          )}
        />
        {errorMessage ? (
          <Text style={{ color: '#ef4444', marginTop: 4, marginLeft: 4, fontSize: 13 }}>
            {errorMessage}
          </Text>
        ) : null}
      </>
    );
  }
  // Uncontrolled
  return (
    <>
      <Input className={inputClassName}>
        {prefix && <InputSlot className={clsx('pl-3', slotClassName)}>{prefix}</InputSlot>}
        <InputField
          className={fieldClassName}
          placeholder={placeholder}
          secureTextEntry={resolvedSecureEntry}
          {...inputProps}
        />
        {resolvedSuffix && (
          <InputSlot className={clsx('pr-3', slotClassName)}>{resolvedSuffix}</InputSlot>
        )}
      </Input>
      {errorMessage ? (
        <Text style={{ color: '#ef4444', marginTop: 4, marginLeft: 4, fontSize: 13 }}>
          {errorMessage}
        </Text>
      ) : null}
    </>
  );
}

type PasswordInputProps = Omit<AppInputProps, 'suffix' | 'secureTextEntry' | 'passwordToggle'> & {
  toggleIcon?: (isVisible: boolean) => React.ReactNode;
};

function PasswordAppInput({ toggleIcon, ...props }: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);

  const iconRenderer = toggleIcon ?? ((isVisible: boolean) => (
    <Text style={{ color: '#cfe3ff', fontSize: 12, fontWeight: '600' }}>
      {isVisible ? 'Hide' : 'Show'}
    </Text>
  ));

  return (
    <BaseAppInput
      {...props}
      secureTextEntry={!visible}
      passwordToggle={{
        isVisible: visible,
        onToggle: () => setVisible((prev) => !prev),
        icon: iconRenderer,
      }}
    />
  );
}

type AppInputComponent = typeof BaseAppInput & { Password: typeof PasswordAppInput };

const AppInput = BaseAppInput as AppInputComponent;
AppInput.Password = PasswordAppInput;

export default AppInput;
