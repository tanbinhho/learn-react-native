import clsx from 'clsx';
import React from 'react';
import { Text as RNText, TextProps } from 'react-native';

/* =======================
   Types
======================= */

type TextVariant = 'title' | 'body' | 'caption' | 'label' | 'error';
type TextColor =
  | 'default'
  | 'muted'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'danger';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextAlign = 'left' | 'center' | 'right';

export interface AppTextProps extends TextProps {
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  align?: TextAlign;
  className?: string;
}

/* =======================
   Style Maps
======================= */

const variantMap: Record<TextVariant, string> = {
  title: 'text-xl leading-7',
  body: 'text-base leading-6',
  caption: 'text-xs leading-4',
  label: 'text-sm leading-5',
  error: 'text-sm leading-5',
};

const colorMap: Record<TextColor, string> = {
  default: 'text-typography-900 dark:text-typography-50',
  muted: 'text-typography-500 dark:text-typography-400',
  primary: 'text-[#09c0ba]', // indicator.primary
  secondary: 'text-secondary-600 dark:text-secondary-400',
  success: 'text-[#12B76A]', // indicator.success
  warning: 'text-[#F79009]', // indicator.warning
  error: 'text-[#F04438]', // indicator.error
  info: 'text-[#3B76DA]', // indicator.info
  danger: 'text-[#F04438]', // indicator.error (alias)
};

const weightMap: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const alignMap: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

/* =======================
   Base Text Component
======================= */

function BaseText({
  variant = 'body',
  color = 'default',
  weight = 'normal',
  align = 'left',
  className,
  children,
  ...props
}: AppTextProps) {
  return (
    <RNText
      {...props}
      className={clsx(
        variantMap[variant],
        colorMap[color],
        weightMap[weight],
        alignMap[align],
        className,
      )}
    >
      {children}
    </RNText>
  );
}

/* =======================
   Preset Components
======================= */

type PresetProps = Omit<AppTextProps, 'variant'>;

const Title = (props: PresetProps) => <BaseText variant="title" weight="bold" {...props} />;

const Caption = (props: PresetProps) => <BaseText variant="caption" color="muted" {...props} />;

const Label = (props: PresetProps) => <BaseText variant="label" weight="medium" {...props} />;

const ErrorText = (props: PresetProps) => <BaseText variant="error" color="danger" {...props} />;

/* =======================
   Export Compound Component
======================= */

export const AppText = Object.assign(BaseText, {
  Title,
  Caption,
  Label,
  Error: ErrorText,
});
