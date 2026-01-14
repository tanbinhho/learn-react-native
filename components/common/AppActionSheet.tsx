import React from 'react';
import { Text, View } from 'react-native';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from '@/components/ui/actionsheet';
import { cn } from '@/utils/cn';

export type AppActionSheetAction = {
  key?: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  className?: string;
};

export type AppActionSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  actions: AppActionSheetAction[];
  cancelLabel?: string;
  onCancel?: () => void;
  showDragHandle?: boolean;
  className?: string;
  contentClassName?: string;
};

export const AppActionSheet = ({
  open,
  onClose,
  title,
  message,
  actions,
  cancelLabel,
  onCancel,
  showDragHandle = true,
  className,
  contentClassName,
}: AppActionSheetProps) => {
  const handleCancel = React.useCallback(() => {
    onCancel?.();
    onClose();
  }, [onCancel, onClose]);

  const renderAction = (action: AppActionSheetAction, index: number) => (
    <ActionsheetItem
      key={action.key ?? action.label}
      disabled={action.disabled}
      onPress={() => {
        action.onPress?.();
        onClose();
      }}
      className={cn(
        'gap-3 px-4 py-3',
        index < actions.length - 1 && 'border-b border-outline-100',
        action.className,
      )}
    >
      <View className="flex-1 flex-row items-center gap-3">
        {action.icon ? (
          <View className="h-9 w-9 items-center justify-center rounded-full bg-background-50">
            {action.icon}
          </View>
        ) : null}
        <View className="flex-1">
          <ActionsheetItemText
            className={cn(
              'text-base font-medium text-typography-900',
              action.destructive && 'text-error-600',
            )}
          >
            {action.label}
          </ActionsheetItemText>
          {action.description ? (
            <Text className="text-xs text-typography-500">{action.description}</Text>
          ) : null}
        </View>
      </View>
    </ActionsheetItem>
  );

  return (
    <Actionsheet isOpen={open} onClose={onClose} className={className}>
      <ActionsheetBackdrop onPress={onClose} />
      <ActionsheetContent className={cn('gap-2.5 px-2.5 pb-5', contentClassName)}>
        {showDragHandle ? (
          <ActionsheetDragIndicatorWrapper className="py-1">
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
        ) : null}

        {(title || message) && (
          <View className="w-full items-center gap-1">
            {title ? (
              <Text className="text-center text-base font-semibold text-typography-900">
                {title}
              </Text>
            ) : null}
            {message ? (
              <Text className="text-center text-sm text-typography-600">{message}</Text>
            ) : null}
          </View>
        )}

        <View className="w-full overflow-hidden rounded-2xl border border-outline-100 bg-background-0 shadow-soft-2">
          {actions.map((action, index) => renderAction(action, index))}
        </View>

        {cancelLabel ? (
          <ActionsheetItem onPress={handleCancel} className="p-2.5">
            <ActionsheetItemText className="w-full text-center text-base font-semibold">
              {cancelLabel}
            </ActionsheetItemText>
          </ActionsheetItem>
        ) : null}
      </ActionsheetContent>
    </Actionsheet>
  );
};
