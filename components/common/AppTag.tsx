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

const tagColor = {
  default: {
    solid: 'bg-background-100 border-outline-300 text-typography-700',
    outline: 'bg-transparent border-outline-400 text-typography-700',
  },
  primary: {
    solid: 'bg-primary-50 border-primary-200 text-primary-700',
    outline: 'bg-transparent border-primary-400',
  },
  success: {
    solid: 'bg-success-50 border-success-200 text-success-700',
    outline: 'bg-transparent border-success-400',
  },
  info: {
    solid: 'bg-info-50 border-info-200 text-info-700',
    outline: 'bg-transparent border-info-400',
  },
  warning: {
    solid: 'bg-warning-50 border-warning-200 text-warning-700',
    outline: 'bg-transparent border-warning-400',
  },
  error: {
    solid: 'bg-error-50 border-error-200 text-error-700',
    outline: 'bg-transparent border-error-400',
  },
};

// Text colors using indicator colors for outline variants
const tagTextColor = {
  default: 'text-typography-700',
  primary: 'text-[#09c0ba]', // indicator.primary
  success: 'text-[#12B76A]', // indicator.success
  info: 'text-[#3B76DA]', // indicator.info
  warning: 'text-[#F79009]', // indicator.warning
  error: 'text-[#F04438]', // indicator.error
};

interface TagProps {
  children: React.ReactNode;

  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'primary' | 'success' | 'info' | 'warning' | 'error';
  shape?: 'rounded' | 'pill';

  outline?: boolean;
  disabled?: boolean;

  onPress?: () => void;
  className?: string;
}

export const Tag = ({
  children,
  size = 'md',
  color = 'default',
  shape = 'rounded',
  outline = false,
  disabled = false,
  onPress,
  className,
}: TagProps) => {
  return (
    <Pressable
      disabled={disabled || !onPress}
      onPress={onPress}
      className={cn(
        tagBase,
        tagSize[size],
        tagShape[shape],
        tagColor[color][outline ? 'outline' : 'solid'],
        disabled && 'opacity-50',
        className,
      )}
    >
      <Text
        className={cn('font-medium', tagTextSize[size], outline ? tagTextColor[color] : undefined)}
      >
        {children}
      </Text>
    </Pressable>
  );
};
