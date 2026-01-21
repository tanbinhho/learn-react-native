import React from 'react';
import { View, ViewProps } from 'react-native';

import { IndicatorColor } from '@/types/color.type';
import { cn } from '@/utils/cn';

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

export type BoxProps = ViewProps & {
  className?: string;
  contentClassName?: string;
};

export type AppBoxColor = IndicatorColor;

export type AppBoxProps = BoxProps;

export type AppBoxColorProps = Omit<BoxProps, 'className'> & {
  color?: AppBoxColor;
  className?: string;
  icon?: React.ReactNode;
};

/* -------------------------------------------------------------------------- */
/*                                   Tokens                                   */
/* -------------------------------------------------------------------------- */

const BOX_BASE_CLASS = 'rounded-xl border border-black/5 bg-white';

const BOX_CONTENT_CLASS = 'rounded-lg p-4';

const BOX_COLOR_MAP: Record<AppBoxColor, string> = {
  default: 'bg-white border',
  primary: 'bg-primary-50',
  success: 'bg-success-50',
  warning: 'bg-warning-50',
  error: 'bg-error-50',
  info: 'bg-info-50',
};

const BOX_ICON_COLOR_MAP: Record<AppBoxColor, string> = {
  default: 'bg-white border dark:bg-gray-800',
  primary: 'bg-primary-100',
  success: 'bg-success-100',
  warning: 'bg-warning-100',
  error: 'bg-error-100',
  info: 'bg-info-100',
};

/* -------------------------------------------------------------------------- */
/*                                  Components                                */
/* -------------------------------------------------------------------------- */

export const AppBox = ({ children, className, contentClassName, style, ...props }: AppBoxProps) => {
  return (
    <View
      {...props}
      className={cn(BOX_BASE_CLASS, className)}
      style={{
        shadowColor: '#101828',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <View className={cn(BOX_CONTENT_CLASS, contentClassName)} style={style}>
        {children}
      </View>
    </View>
  );
};

type AppBoxVariantProps = Omit<AppBoxColorProps, 'color'>;

function createBoxVariant(color: AppBoxColor) {
  return function BoxVariant({ children, className, icon, ...props }: AppBoxVariantProps) {
    return (
      <View className={cn('rounded-xl p-3', BOX_COLOR_MAP[color], className)} {...props}>
        {icon && (
          <View
            className={cn(
              'h-10 w-10 items-center justify-center rounded-full',
              BOX_ICON_COLOR_MAP[color],
            )}
          >
            {icon}
          </View>
        )}
        {children}
      </View>
    );
  };
}

AppBox.Primary = createBoxVariant('primary');
AppBox.Success = createBoxVariant('success');
AppBox.Warning = createBoxVariant('warning');
AppBox.Error = createBoxVariant('error');
AppBox.Info = createBoxVariant('info');
AppBox.Default = createBoxVariant('default');
