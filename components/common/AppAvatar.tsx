import { getInitials } from '@/utils';
import { cn } from '@/utils/cn';
import { View } from 'react-native';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '../ui/avatar';

const SIZE_MAP = {
  sm: {
    text: 'text-xs',
    status: 'w-2 h-2',
  },
  md: {
    text: 'text-sm',
    status: 'w-2.5 h-2.5',
  },
  lg: {
    text: 'text-lg',
    status: 'w-3 h-3',
  },
  xl: {
    text: 'text-xl',
    status: 'w-3.5 h-3.5',
  },
};

type Props = {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  showStatus?: boolean;
  status?: 'online' | 'offline';
  className?: string;
  border?: boolean;
};

export function AppAvatar({
  src,
  name,
  size = 'md',
  shape = 'circle',
  showStatus = false,
  status = 'online',
  className,
  border = false,
}: Props) {
  const styles = SIZE_MAP[size];
  const radius = shape === 'circle' ? 'rounded-full' : 'rounded-xl';

  return (
    <View className="relative">
      <Avatar
        size={size}
        className={cn(
          radius,
          'bg-muted items-center justify-center',
          border && 'border-2 border-primary-500',
          className,
        )}
      >
        {src ? (
          <AvatarImage source={{ uri: src }} className={cn('h-full w-full', radius)} />
        ) : (
          <AvatarFallbackText className={cn(styles.text, 'text-foreground font-semibold')}>
            {getInitials(name)}
          </AvatarFallbackText>
        )}
        {showStatus && (
          <AvatarBadge
            className={cn(
              'border-2 border-white',
              status === 'online' ? 'bg-green-500' : 'bg-gray-400',
            )}
          />
        )}
      </Avatar>
    </View>
  );
}
