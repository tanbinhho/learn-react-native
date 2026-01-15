import React from 'react';
import { Switch } from '../ui/switch';

/* -------------------- Types -------------------- */

type AppSwitchProps = Omit<
  React.ComponentProps<typeof Switch>,
  'onValueChange' | 'value' | 'defaultValue'
> & {
  value?: boolean;
  onChange?: (value: boolean) => void;
  error?: string | { message?: string };
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

/* -------------------- Component -------------------- */

export function AppSwitch({
  value,
  onChange,
  error,
  disabled,
  className,
  size = 'md',
  ...rest
}: AppSwitchProps) {
  const hasError = !!(typeof error === 'string' ? error : error?.message);
  return (
    <Switch
      value={!!value}
      onValueChange={onChange}
      disabled={disabled}
      size={size}
      className={hasError ? 'border-red-500' : className}
      {...rest}
    />
  );
}
