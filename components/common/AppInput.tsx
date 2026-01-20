import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Textarea, TextareaInput } from '@/components/ui/textarea';
import { clsx } from 'clsx';
import { Eye, EyeOff } from 'lucide-react-native';
import React from 'react';
import { Text, TextInputProps, TouchableOpacity } from 'react-native';

/**
 * AppInput supports both controlled (react-hook-form) and uncontrolled usage.
 * If control and name are provided, it will use Controller.
 */
type AppInputSize = 'large' | 'middle' | 'small';

type AppInputProps = Omit<
  TextInputProps,
  'onChange' | 'onChangeText' | 'value' | 'defaultValue' | 'onBlur'
> & {
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
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
    input: 'h-[56px] px-4 text-base',
    field: 'text-base',
    slot: 'text-base',
  },
  middle: {
    input: 'h-[48px] px-4 text-sm',
    field: 'text-sm',
    slot: 'text-sm',
  },
  small: {
    input: 'h-[40px] px-3 text-sm',
    field: 'text-sm',
    slot: 'text-sm',
  },
};

const textareaSizeMap: Record<AppInputSize, 'sm' | 'md' | 'lg'> = {
  large: 'lg',
  middle: 'md',
  small: 'sm',
};

function BaseAppInput({
  value,
  onChangeText,
  onBlur,
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
  const hasError = !!(typeof error === 'string' ? error : error?.message);
  const borderClass = hasError ? 'border border-red-500' : 'border border-gray-300';
  const sizeClass = sizeStyles[size] ?? sizeStyles.middle;
  const inputClassName = clsx(
    'rounded-xl bg-white text-gray-900 shadow-sm flex-row items-center gap-2 border transition-colors',
    sizeClass.input,
    borderClass,
    className,
  );
  const fieldClassName = clsx(
    'flex-1 text-gray-900 placeholder:text-gray-400 font-medium px-0',
    sizeClass.field,
    inputFieldClassName,
  );
  const slotClassName = clsx('opacity-90 text-gray-500', sizeClass.slot);
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

  return (
    <Input className={inputClassName}>
      {prefix && <InputSlot className={clsx(slotClassName)}>{prefix}</InputSlot>}
      <InputField
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        secureTextEntry={resolvedSecureEntry}
        className={fieldClassName}
        {...inputProps}
      />
      {resolvedSuffix && <InputSlot className={clsx(slotClassName)}>{resolvedSuffix}</InputSlot>}
    </Input>
  );
}

type PasswordInputProps = Omit<AppInputProps, 'suffix' | 'secureTextEntry' | 'passwordToggle'> & {
  toggleIcon?: (isVisible: boolean) => React.ReactNode;
};

function PasswordAppInput({ toggleIcon, ...props }: PasswordInputProps) {
  const [visible, setVisible] = React.useState(false);
  const iconRenderer =
    toggleIcon ?? ((isVisible: boolean) => (isVisible ? <Eye size={20} /> : <EyeOff size={20} />));
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

type AppTextareaProps = Omit<
  AppInputProps,
  'prefix' | 'suffix' | 'passwordToggle' | 'secureTextEntry'
>;

function TextareaAppInput({
  value,
  onChangeText,
  onBlur,
  error,
  size = 'middle',
  className,
  inputFieldClassName,
  placeholder = 'Type your message...',
  ...inputProps
}: AppTextareaProps) {
  const hasError = !!(typeof error === 'string' ? error : error?.message);
  const borderClass = hasError ? 'border border-red-500' : 'border border-gray-300';
  const sizeClass = sizeStyles[size] ?? sizeStyles.middle;
  const textareaClassName = clsx(
    'rounded-xl bg-white text-gray-900 shadow-sm border transition-colors',
    sizeClass.input,
    borderClass,
    className,
  );
  const fieldClassName = clsx(
    'flex-1 text-gray-900 placeholder:text-gray-400 font-medium px-0 py-3',
    sizeClass.field,
    inputFieldClassName,
  );
  const resolvedMultiline = inputProps.multiline ?? true;
  const textareaSize = textareaSizeMap[size] ?? 'md';
  return (
    <Textarea className={textareaClassName} size={textareaSize}>
      <TextareaInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        multiline={resolvedMultiline}
        className={fieldClassName}
        {...inputProps}
      />
    </Textarea>
  );
}

type AppInputComponent = typeof BaseAppInput & {
  Password: typeof PasswordAppInput;
  Textarea: typeof TextareaAppInput;
};

const AppInput = BaseAppInput as AppInputComponent;
AppInput.Password = PasswordAppInput;
AppInput.Textarea = TextareaAppInput;

export default AppInput;
