import { INDICATOR_COLOR } from '@/constants/theme';
import { cn } from '@/utils/cn';
import React from 'react';
import { ActivityIndicator, Pressable, Text, TextStyle, ViewStyle } from 'react-native';

type ButtonColor =
  | 'default'
  | 'primary'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'danger'
  | (string & {});
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type ButtonShape = 'default' | 'round';

export type AppButtonProps = {
  title?: string;
  onPress?: () => void;
  variant?: 'outlined' | 'dashed' | 'filled' | 'text';
  size?: ButtonSize;
  shape?: ButtonShape;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPlacement?: 'start' | 'end';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  color?: ButtonColor; // custom brand color override or token
  className?: string;
  classNameText?: string;
  children?: React.ReactNode;
};

const variantStyles: Record<
  NonNullable<AppButtonProps['variant']>,
  { container: string; text: string; pressed: string; textPressed: string }
> = {
  outlined: {
    container: 'bg-white border border-outline-400',
    text: 'text-typography-800',
    pressed: 'bg-background-50',
    textPressed: 'text-typography-900',
  },
  dashed: {
    container: 'bg-white border border-dashed border-outline-300',
    text: 'text-typography-800',
    pressed: 'bg-background-50',
    textPressed: 'text-typography-900',
  },
  filled: {
    container: 'bg-primary-500 border-primary-500',
    text: 'text-white',
    pressed: 'bg-primary-600',
    textPressed: 'text-white',
  },
  text: {
    container: 'bg-transparent border-transparent',
    text: 'text-typography-800',
    pressed: 'bg-background-50',
    textPressed: 'text-typography-900',
  },
};

const sizeStyles: Record<ButtonSize, { container: string; text: string }> = {
  sm: { container: 'h-9 px-3 text-sm', text: 'text-sm' },
  md: { container: 'h-11 px-4 text-base', text: 'text-base' },
  lg: { container: 'h-12 px-5 text-base', text: 'text-base' },
  xl: { container: 'h-14 px-6 text-lg', text: 'text-lg' },
};

const shapeStyles: Record<ButtonShape, string> = {
  default: 'rounded-xl',
  round: 'rounded-full',
};

export function AppButton({
  title,
  onPress,
  variant = 'outlined',
  size = 'md',
  shape = 'default',
  block = false,
  disabled = false,
  loading = false,
  icon,
  iconPlacement = 'start',
  color = 'default',
  className,
  children,
  classNameText,
}: AppButtonProps) {
  const [pressed, setPressed] = React.useState(false);

  const resolvedVariant = variant ?? 'outlined';
  const isDisabled = disabled || loading;
  const sizeConfig = sizeStyles[size];
  const tone = variantStyles[resolvedVariant];

  const customColorStyle: ViewStyle = {};
  const customTextColorStyle: TextStyle = {};

  const resolveColorValue = (value?: ButtonColor): string | undefined => {
    if (!value || value === 'default') return undefined;
    if (value === 'primary') return INDICATOR_COLOR.primary;
    if (value === 'info') return INDICATOR_COLOR.info;
    if (value === 'success') return INDICATOR_COLOR.success;
    if (value === 'warning') return INDICATOR_COLOR.warning;
    if (value === 'error' || value === 'danger') return INDICATOR_COLOR.error;
    return value;
  };

  const colorValue = resolveColorValue(color);

  if (colorValue) {
    const isGhosty = resolvedVariant === 'text';
    const isOutlined = resolvedVariant === 'outlined' || resolvedVariant === 'dashed';

    if (isGhosty) {
      customTextColorStyle.color = colorValue;
    } else if (isOutlined) {
      customColorStyle.borderColor = colorValue;
      customTextColorStyle.color = colorValue;
      customColorStyle.backgroundColor = 'transparent';
    } else {
      customColorStyle.backgroundColor = colorValue;
      customColorStyle.borderColor = colorValue;
      customTextColorStyle.color = '#ffffff';
    }
  }

  const handlePress = () => {
    if (!isDisabled && onPress) {
      onPress();
    }
  };

  const content = (
    <>
      {iconPlacement === 'start' && icon}
      {(title || children) && (
        <Text
          className={cn(
            'font-semibold',
            sizeConfig.text,
            pressed && !isDisabled ? tone.textPressed : tone.text,
            isDisabled && 'opacity-70',
            classNameText,
          )}
          style={customTextColorStyle}
        >
          {children || title}
        </Text>
      )}
      {iconPlacement === 'end' && icon}
    </>
  );

  console.log('colorValue', colorValue);
  console.log('resolvedVariant', resolvedVariant);

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={isDisabled}
      className={cn(
        'flex-row items-center justify-center gap-2 border bg-transparent',
        sizeConfig.container,
        shapeStyles[shape],
        tone.container,
        pressed && !isDisabled && tone.pressed,
        isDisabled && 'opacity-60',
        block && 'flex-1',
        className,
      )}
      style={customColorStyle}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            resolvedVariant === 'text' ||
            resolvedVariant === 'outlined' ||
            resolvedVariant === 'dashed'
              ? '#4B5563'
              : '#ffffff'
          }
        />
      ) : (
        content
      )}
    </Pressable>
  );
}
