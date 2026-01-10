import { Divider, Text } from '@gluestack-ui/themed';
import clsx from 'clsx';
import { Dot } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

type ListProps = {
  children: React.ReactNode;
  divider?: boolean;
  dividerProps?: React.ComponentProps<typeof Divider>;
  gap?: string;
  className?: string;
};

type ListItemProps = {
  title?: string;
  description?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
  pressable?: boolean;
  danger?: boolean;
  className?: string;
  onPress?: () => void;
};

const ListRoot = ({ children, divider = false, dividerProps, className }: ListProps) => {
  const items = React.Children.toArray(children);

  return (
    <View className={clsx(className)}>
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {divider && index < items.length - 1 && <Divider {...dividerProps} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const ListItem = ({
  title,
  description,
  left = <Dot />,
  right,
  pressable,
  danger,
  className,
  onPress,
}: ListItemProps) => {
  const Wrapper = pressable ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      className={clsx('flex-row items-center gap-1', pressable && 'active:opacity-70', className)}
    >
      {left && <View>{left}</View>}

      <View className="flex-1">
        {title && (
          <Text className={clsx('text-base', danger ? 'text-error-600' : 'text-typography-900')}>
            {title}
          </Text>
        )}

        {description && <Text className="text-sm text-typography-500">{description}</Text>}
      </View>

      {right && <View>{right}</View>}
    </Wrapper>
  );
};

/**
 * API: <List><List.Item /></List>
 */
export const List = Object.assign(ListRoot, {
  Item: ListItem,
});
