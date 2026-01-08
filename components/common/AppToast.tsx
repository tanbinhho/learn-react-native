import { Toast, ToastDescription, ToastTitle } from '@/components/ui/toast';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';

type ToastVariant = 'success' | 'error' | 'info' | 'warning' | 'default';

type AppToastProps = {
  id: string;
  variant?: ToastVariant;
  title?: string;
  description?: string;
};

const variantConfig: Record<
  ToastVariant,
  { action: any; icon: keyof typeof Feather.glyphMap; iconColor: string }
> = {
  success: {
    action: 'success',
    icon: 'check-circle',
    iconColor: '#22c55e',
  },
  error: {
    action: 'error',
    icon: 'alert-circle',
    iconColor: '#ef4444',
  },
  warning: {
    action: 'warning',
    icon: 'alert-triangle',
    iconColor: '#f59e0b',
  },
  info: {
    action: 'info',
    icon: 'info',
    iconColor: '#09c0ba',
  },
  default: {
    action: 'muted',
    icon: 'message-circle',
    iconColor: '#6b7280',
  },
};

export function AppToast({ id, variant = 'default', title, description }: AppToastProps) {
  const config = variantConfig[variant];

  return (
    <Toast
      nativeID={id}
      action={config.action}
      className="min-w-[320px] flex-row items-start gap-3 web:max-w-md"
    >
      <View className="mt-0.5">
        <Feather name={config.icon} size={20} color={config.iconColor} />
      </View>
      <View className="flex-1">
        {title && <ToastTitle className="font-semibold">{title}</ToastTitle>}
        {description && (
          <ToastDescription className="text-sm opacity-90">{description}</ToastDescription>
        )}
      </View>
    </Toast>
  );
}
