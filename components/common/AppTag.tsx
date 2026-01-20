import { cn } from '@/utils/cn'; // helper merge class
import { Pressable, Text } from 'react-native';

const tagBase = 'flex-row items-center justify-center border';

const tagShape = {
  rounded: 'rounded-lg',
  pill: 'rounded-full',
};

const tagSize = {
  sm: 'h-6 px-2',
  md: 'h-7 px-3',
  lg: 'h-8 px-4',
};

const tagTextSize = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

type TagColor = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error';

type TagVariant = 'filled' | 'outlined' | 'solid';

type VariantStyles = {
  container: string;
  text: string;
};

const tagStyles: Record<TagColor, Record<TagVariant, VariantStyles>> = {
  default: {
    filled: {
      container: 'bg-background-100 border-outline-300',
      text: 'text-typography-700',
    },
    outlined: {
      container: 'bg-background-0 border-outline-300',
      text: 'text-typography-700',
    },
    solid: {
      container: 'bg-typography-900 border-typography-900',
      text: 'text-white',
    },
  },
  primary: {
    filled: {
      container: 'bg-primary-50 border-primary-200',
      text: 'text-primary-700',
    },
    outlined: {
      container: 'bg-primary-0 border-primary-300',
      text: 'text-primary-700',
    },
    solid: {
      container: 'bg-primary-500 border-primary-500',
      text: 'text-white',
    },
  },
  success: {
    filled: {
      container: 'bg-success-50 border-success-200',
      text: 'text-success-700',
    },
    outlined: {
      container: 'bg-success-0 border-success-300',
      text: 'text-success-700',
    },
    solid: {
      container: 'bg-success-500 border-success-500',
      text: 'text-white',
    },
  },
  info: {
    filled: {
      container: 'bg-info-50 border-info-200',
      text: 'text-info-700',
    },
    outlined: {
      container: 'bg-info-0 border-info-300',
      text: 'text-[#3B76DA]',
    },
    solid: {
      container: 'bg-info-500 border-info-500',
      text: 'text-white',
    },
  },
  warning: {
    filled: {
      container: 'bg-warning-50 border-warning-200',
      text: 'text-warning-700',
    },
    outlined: {
      container: 'bg-warning-0 border-warning-300',
      text: 'text-[#F79009]',
    },
    solid: {
      container: 'bg-warning-500 border-warning-500',
      text: 'text-white',
    },
  },
  error: {
    filled: {
      container: 'bg-error-50 border-error-200',
      text: 'text-error-700',
    },
    outlined: {
      container: 'bg-error-0 border-error-300',
      text: 'text-[#F04438]',
    },
    solid: {
      container: 'bg-error-500 border-error-500',
      text: 'text-white',
    },
  },
};

export interface AppTagProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  color?: TagColor;
  shape?: 'rounded' | 'pill';
  variant?: TagVariant;
  disabled?: boolean;
  onPress?: () => void;
  className?: string;
}

export const AppTag = ({
  children,
  size = 'md',
  color = 'default',
  shape = 'rounded',
  variant = 'filled',
  disabled = false,
  onPress,
  className,
}: AppTagProps) => {
  const variantStyle = tagStyles[color][variant];

  return (
    <Pressable
      disabled={disabled || !onPress}
      onPress={onPress}
      className={cn(
        tagBase,
        tagSize[size],
        tagShape[shape],
        variantStyle.container,
        disabled && 'opacity-50',
        className,
      )}
    >
      <Text className={cn('font-medium', tagTextSize[size], variantStyle.text)}>{children}</Text>
    </Pressable>
  );
};
