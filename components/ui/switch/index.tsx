'use client';
import { createSwitch } from '@gluestack-ui/core/switch/creator';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { tva, withStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import React from 'react';
import { Switch as RNSwitch } from 'react-native';

const UISwitch = createSwitch({
  Root: withStyleContext(RNSwitch),
});

const switchStyle = tva({
  base: 'data-[focus=true]:outline-0 data-[focus=true]:ring-2 data-[focus=true]:ring-primary-500 web:cursor-pointer disabled:cursor-not-allowed data-[disabled=true]:opacity-40 data-[invalid=true]:border-error-500 data-[invalid=true]:rounded-xl data-[invalid=true]:border-2',

  variants: {
    size: {
      sm: 'scale-75',
      md: 'scale-100',
      lg: 'scale-125',
    },
  },
});

type ISwitchProps = React.ComponentProps<typeof UISwitch> & VariantProps<typeof switchStyle>;
const Switch = React.forwardRef<React.ComponentRef<typeof UISwitch>, ISwitchProps>(function Switch(
  { className, size = 'md', ...props },
  ref,
) {
  return (
    <UISwitch
      ref={ref}
      trackColor={{ false: '#e5e7eb', true: '#09c0ba' }}
      thumbColor={props.value ? '#ffffff' : '#f3f4f6'}
      ios_backgroundColor="#e5e7eb"
      {...props}
      className={switchStyle({ size, class: className })}
    />
  );
});

Switch.displayName = 'Switch';
export { Switch };
