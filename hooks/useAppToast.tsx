import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import * as React from 'react';

type ToastVariant = 'success' | 'error' | 'info' | 'warning' | 'default';

type ShowToastOptions = {
  title?: string;
  description?: string;
  duration?: number;
  placement?: 'top' | 'bottom';
  variant?: ToastVariant;
};

const variantMap: Record<ToastVariant, { action: any; className?: string }> = {
  success: {
    action: 'success',
  },
  error: {
    action: 'error',
  },
  warning: {
    action: 'warning',
  },
  info: {
    action: 'muted',
  },
  default: {
    action: 'muted',
  },
};

export function useAppToast() {
  const toast = useToast();
  const activeToastId = React.useRef<string | null>(null);

  const show = React.useCallback(
    ({
      title,
      description,
      duration = 3000,
      placement = 'top',
      variant = 'default',
    }: ShowToastOptions) => {
      if (activeToastId.current && toast.isActive(activeToastId.current)) {
        return;
      }

      const id = `toast-${Date.now()}`;
      activeToastId.current = id;

      toast.show({
        id,
        placement,
        duration,
        render: () => (
          <Toast nativeID={id} action={variantMap[variant].action}>
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </Toast>
        ),
      });
    },
    [toast],
  );

  return {
    show,
    success: (message: string, opts?: Partial<ShowToastOptions>) =>
      show({
        title: 'Success',
        description: message,
        variant: 'success',
        ...opts,
      }),

    error: (message: string, opts?: Partial<ShowToastOptions>) =>
      show({
        title: 'Error',
        description: message,
        variant: 'error',
        ...opts,
      }),

    info: (message: string, opts?: Partial<ShowToastOptions>) =>
      show({
        title: 'Info',
        description: message,
        variant: 'info',
        ...opts,
      }),

    warning: (message: string, opts?: Partial<ShowToastOptions>) =>
      show({
        title: 'Warning',
        description: message,
        variant: 'warning',
        ...opts,
      }),
  };
}
