import { INDICATOR_COLOR } from '@/constants/theme';
import { IndicatorColor } from '@/types/color.type';
import { cn } from '@/utils/cn';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';
export type BadgeColor = IndicatorColor | (string & {});
export type BadgeSize = 'sm' | 'md' | 'lg';

type Offset = [number, number];

export type AppBadgeProps = {
  count?: number;
  overflowCount?: number;
  showZero?: boolean;
  dot?: boolean;
  status?: BadgeStatus;
  color?: BadgeColor;
  size?: BadgeSize;
  offset?: Offset;
  className?: string;
  badgeClassName?: string;
  textClassName?: string;
  children?: React.ReactNode;
};

const presetColors: Record<IndicatorColor, string> = INDICATOR_COLOR;

const statusColors: Record<BadgeStatus, string> = {
  success: INDICATOR_COLOR.success,
  processing: INDICATOR_COLOR.info,
  default: INDICATOR_COLOR.default,
  error: INDICATOR_COLOR.error,
  warning: INDICATOR_COLOR.warning,
};

const sizeStyles: Record<
  BadgeSize,
  { dot: number; height: number; paddingX: number; font: string }
> = {
  sm: { dot: 8, height: 16, paddingX: 5, font: 'text-[10px]' },
  md: { dot: 10, height: 18, paddingX: 6, font: 'text-[11px]' },
  lg: { dot: 12, height: 20, paddingX: 7, font: 'text-xs' },
};

const resolveColor = (color?: BadgeColor, status?: BadgeStatus): string | undefined => {
  if (status) return statusColors[status];
  if (!color) return undefined;
  if (color in presetColors) return presetColors[color as IndicatorColor];
  return color;
};

export function AppBadge({
  count,
  overflowCount = 99,
  showZero = false,
  dot = false,
  status,
  color,
  size = 'md',
  offset,
  className,
  badgeClassName,
  textClassName,
  children,
}: AppBadgeProps) {
  const sizeConf = sizeStyles[size];
  const valueColor = resolveColor(color, status);

  const displayCount =
    typeof count === 'number' && count > overflowCount ? `${overflowCount}+` : count;
  const isZero = displayCount === 0 || displayCount === '0';
  const hidden =
    !dot && (displayCount === undefined || displayCount === null || (!showZero && isZero));

  const badgeStyle: ViewStyle = {
    backgroundColor: valueColor ?? INDICATOR_COLOR.error,
    minHeight: sizeConf.height,
    paddingHorizontal: dot ? 0 : sizeConf.paddingX,
  };

  const dotStyle: ViewStyle = {
    width: sizeConf.dot,
    height: sizeConf.dot,
    borderRadius: sizeConf.dot / 2,
    backgroundColor: valueColor ?? INDICATOR_COLOR.error,
  };

  const content = hidden ? null : (
    <View
      className={cn(
        'items-center justify-center rounded-full border border-white',
        dot ? '' : 'px-0',
        badgeClassName,
      )}
      style={dot ? dotStyle : badgeStyle}
    >
      {!dot ? (
        <Text className={cn('font-semibold text-white', sizeConf.font, textClassName)}>
          {displayCount}
        </Text>
      ) : null}
    </View>
  );

  if (!children) {
    return <View className={cn('flex-row items-center', className)}>{content}</View>;
  }

  const [x = 0, y = 0] = offset ?? [];

  return (
    <View className={cn('relative', className)}>
      {children}
      <View
        className="absolute right-0 top-0"
        style={{ transform: [{ translateX: x }, { translateY: y }] }}
        pointerEvents="none"
      >
        {content}
      </View>
    </View>
  );
}

export default AppBadge;
