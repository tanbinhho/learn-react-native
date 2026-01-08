'use client';
import { createToastHook } from '@gluestack-ui/core/toast/creator';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { tva, useStyleContext, withStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { AnimatePresence, Motion, MotionComponentProps } from '@legendapp/motion';
import { cssInterop } from 'nativewind';
import React from 'react';
import { AccessibilityInfo, Text, View, ViewStyle } from 'react-native';

type IMotionViewProps = React.ComponentProps<typeof View> &
  MotionComponentProps<typeof View, ViewStyle, unknown, unknown, unknown>;

const MotionView = Motion.View as React.ComponentType<IMotionViewProps>;

const useToast = createToastHook(MotionView, AnimatePresence);
const SCOPE = 'TOAST';

cssInterop(MotionView, { className: 'style' });

const toastStyle = tva({
  base: 'p-4 m-2 rounded-xl gap-1 web:pointer-events-auto shadow-soft-2 border',
  variants: {
    action: {
      error: 'bg-error-50 border-error-200',
      warning: 'bg-warning-50 border-warning-200',
      success: 'bg-success-50 border-success-200',
      info: 'bg-info-50 border-info-200',
      muted: 'bg-background-50 border-background-200',
    },

    variant: {
      solid: '',
      outline: 'border bg-background-0',
    },
  },
});

const toastTitleStyle = tva({
  base: 'text-typography-900 font-semibold font-body tracking-md text-left',
  variants: {
    isTruncated: {
      true: '',
    },
    bold: {
      true: 'font-bold',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
    },
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
  },
  parentVariants: {
    variant: {
      solid: '',
      outline: '',
    },
    action: {
      error: 'text-error-900',
      warning: 'text-warning-900',
      success: 'text-success-900',
      info: 'text-info-900',
      muted: 'text-typography-900',
    },
  },
  parentCompoundVariants: [
    {
      variant: 'outline',
      action: 'error',
      class: 'text-error-800',
    },
    {
      variant: 'outline',
      action: 'warning',
      class: 'text-warning-800',
    },
    {
      variant: 'outline',
      action: 'success',
      class: 'text-success-800',
    },
    {
      variant: 'outline',
      action: 'info',
      class: 'text-info-800',
    },
    {
      variant: 'outline',
      action: 'muted',
      class: 'text-background-800',
    },
  ],
});

const toastDescriptionStyle = tva({
  base: 'font-normal font-body tracking-md text-left text-typography-700',
  variants: {
    isTruncated: {
      true: '',
    },
    bold: {
      true: 'font-bold',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
    },
    size: {
      '2xs': 'text-2xs',
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
  },
  parentVariants: {
    variant: {
      solid: '',
      outline: '',
    },
    action: {
      error: 'text-error-800',
      warning: 'text-warning-800',
      success: 'text-success-800',
      info: 'text-info-800',
      muted: 'text-typography-700',
    },
  },
});

const Root = withStyleContext(View, SCOPE);
type IToastProps = React.ComponentProps<typeof Root> & {
  className?: string;
} & VariantProps<typeof toastStyle>;

const Toast = React.forwardRef<React.ComponentRef<typeof Root>, IToastProps>(function Toast(
  { className, variant = 'solid', action = 'muted', ...props },
  ref,
) {
  return (
    <Root
      ref={ref}
      className={toastStyle({ variant, action, class: className })}
      context={{ variant, action }}
      {...props}
    />
  );
});

type IToastTitleProps = React.ComponentProps<typeof Text> & {
  className?: string;
} & VariantProps<typeof toastTitleStyle>;

const ToastTitle = React.forwardRef<React.ComponentRef<typeof Text>, IToastTitleProps>(
  function ToastTitle({ className, size = 'md', children, ...props }, ref) {
    const { variant: parentVariant, action: parentAction } = useStyleContext(SCOPE);
    React.useEffect(() => {
      // Issue from react-native side
      // Hack for now, will fix this later
      AccessibilityInfo.announceForAccessibility(children as string);
    }, [children]);

    return (
      <Text
        {...props}
        ref={ref}
        aria-live="assertive"
        aria-atomic="true"
        role="alert"
        className={toastTitleStyle({
          size,
          class: className,
          parentVariants: {
            variant: parentVariant,
            action: parentAction,
          },
        })}
      >
        {children}
      </Text>
    );
  },
);

type IToastDescriptionProps = React.ComponentProps<typeof Text> & {
  className?: string;
} & VariantProps<typeof toastDescriptionStyle>;

const ToastDescription = React.forwardRef<React.ComponentRef<typeof Text>, IToastDescriptionProps>(
  function ToastDescription({ className, size = 'md', ...props }, ref) {
    const { variant: parentVariant } = useStyleContext(SCOPE);
    return (
      <Text
        ref={ref}
        {...props}
        className={toastDescriptionStyle({
          size,
          class: className,
          parentVariants: {
            variant: parentVariant,
          },
        })}
      />
    );
  },
);

Toast.displayName = 'Toast';
ToastTitle.displayName = 'ToastTitle';
ToastDescription.displayName = 'ToastDescription';

export { Toast, ToastDescription, ToastTitle, useToast };
