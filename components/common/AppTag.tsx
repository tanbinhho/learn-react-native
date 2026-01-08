import { cn } from '@/utils/cn'; // helper merge class
import { Pressable } from 'react-native';

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
    solid: 'bg-gray-100 border-gray-200 text-gray-700',
    outline: 'bg-transparent border-gray-300 text-gray-700',
  },
  primary: {
    solid: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    outline: 'bg-transparent border-indigo-300 text-indigo-700',
  },
  success: {
    solid: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    outline: 'bg-transparent border-emerald-300 text-emerald-700',
  },
  info: {
    solid: 'bg-sky-50 border-sky-200 text-sky-700',
    outline: 'bg-transparent border-sky-300 text-sky-700',
  },
  warning: {
    solid: 'bg-amber-50 border-amber-200 text-amber-700',
    outline: 'bg-transparent border-amber-300 text-amber-700',
  },
  error: {
    solid: 'bg-red-50 border-red-200 text-red-700',
    outline: 'bg-transparent border-red-300 text-red-700',
  },
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
      <Text className={cn('font-medium', tagTextSize[size])}>{children}</Text>
    </Pressable>
  );
};
