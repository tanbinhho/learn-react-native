import { cn } from '@/utils/cn';
import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

export type AppButtonProps = {
  title?: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
  children?: React.ReactNode;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 border-primary-500',
  secondary: 'bg-secondary-500 border-secondary-500',
  outline: 'bg-white border-2 border-primary-500',
  ghost: 'bg-transparent border-transparent',
  danger: 'bg-error-500 border-error-500',
};

const variantPressedStyles: Record<ButtonVariant, string> = {
  primary: 'bg-primary-600',
  secondary: 'bg-secondary-600',
  outline: 'bg-primary-500 border-primary-500',
  ghost: 'bg-background-100',
  danger: 'bg-error-600',
};

const variantTextStyles: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-primary-500',
  ghost: 'text-typography-700',
  danger: 'text-white',
};

const variantPressedTextStyles: Record<ButtonVariant, string> = {
  primary: 'text-white',
  secondary: 'text-white',
  outline: 'text-white',
  ghost: 'text-typography-700',
  danger: 'text-white',
};

const sizeStyles: Record<ButtonSize, { container: string; text: string; icon: number }> = {
  sm: { container: 'h-9 px-3', text: 'text-sm', icon: 16 },
  md: { container: 'h-11 px-5', text: 'text-base', icon: 18 },
  lg: { container: 'h-12 px-6', text: 'text-base', icon: 20 },
  xl: { container: 'h-14 px-8', text: 'text-lg', icon: 22 },
};

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  prefix,
  suffix,
  fullWidth = false,
  className,
  children,
}: AppButtonProps) {
  const [pressed, setPressed] = React.useState(false);

  const isDisabled = disabled || loading;
  const sizeConfig = sizeStyles[size];

  const handlePress = () => {
    if (!isDisabled && onPress) {
      onPress();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      disabled={isDisabled}
      className={cn(
        'flex-row items-center justify-center gap-2 rounded-xl border shadow-sm',
        sizeConfig.container,
        variantStyles[variant],
        pressed && !isDisabled && variantPressedStyles[variant],
        isDisabled && 'opacity-50',
        fullWidth && 'w-full',
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? '#09c0ba' : '#ffffff'}
        />
      ) : (
        <>
          {prefix}
          {(title || children) && (
            <Text
              className={cn(
                'font-semibold',
                sizeConfig.text,
                pressed && !isDisabled
                  ? variantPressedTextStyles[variant]
                  : variantTextStyles[variant],
                isDisabled && 'opacity-70',
              )}
            >
              {children || title}
            </Text>
          )}
          {suffix}
        </>
      )}
    </Pressable>
  );
}
