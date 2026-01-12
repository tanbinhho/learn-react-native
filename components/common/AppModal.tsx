import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@/components/ui/modal';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';
import { AppButton, AppButtonProps } from './AppButton';

type ModalSize = React.ComponentProps<typeof Modal>['size'];

type AppModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  size?: ModalSize;
  cancelLabel?: string;
  confirmLabel?: string;
  cancelButtonProps?: AppButtonProps;
  confirmButtonProps?: AppButtonProps;
  footer?: React.ReactNode;
  closable?: boolean;
  className?: string;
  contentClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
};

function AppModal({
  open,
  onClose,
  onConfirm,
  onCancel,
  title,
  description,
  children,
  size = 'md',
  cancelLabel = 'Cancel',
  confirmLabel = 'OK',
  cancelButtonProps,
  confirmButtonProps,
  footer,
  closable = true,
  className,
  contentClassName,
  bodyClassName,
  footerClassName,
}: AppModalProps) {
  const defaultActions = [
    {
      label: cancelLabel,
      onPress: onCancel ?? onClose,
      variant: 'outlined' as const,
      buttonProps: cancelButtonProps,
    },
    {
      label: confirmLabel,
      onPress: onConfirm ?? onClose,
      variant: 'filled' as const,
      buttonProps: confirmButtonProps,
    },
  ];

  const defaultContentAnimation = {
    initial: { opacity: 0, scale: 0.96, translateY: 12 },
    animate: { opacity: 1, scale: 1, translateY: 0 },
    exit: { opacity: 0, scale: 0.98, translateY: 8 },
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 240,
      opacity: { type: 'timing', duration: 180 },
    },
  } as const;

  return (
    <Modal isOpen={open} onClose={onClose} size={size} className={className}>
      <ModalBackdrop onPress={onClose} />
      <ModalContent
        className={cn('gap-4', contentClassName)}
        initial={defaultContentAnimation.initial}
        animate={defaultContentAnimation.animate}
        exit={defaultContentAnimation.exit}
        transition={defaultContentAnimation.transition}
      >
        {(title || description || closable) && (
          <ModalHeader className="items-center gap-3">
            <View className="flex-1">
              {title ? (
                <Text className="text-lg font-semibold text-typography-900">{title}</Text>
              ) : null}
              {description ? (
                <Text className="mt-1 text-sm text-typography-600">{description}</Text>
              ) : null}
            </View>
            {closable ? (
              <ModalCloseButton onPress={onClose}>
                <X />
              </ModalCloseButton>
            ) : null}
          </ModalHeader>
        )}

        <ModalBody className={bodyClassName}>{children}</ModalBody>

        <ModalFooter className={cn('justify-end gap-2', footerClassName)}>
          {footer ??
            defaultActions.map((action) => (
              <AppButton
                key={action.label}
                title={action.label}
                onPress={action.onPress}
                variant={action.variant}
                {...action.buttonProps}
              />
            ))}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AppModal;
export { AppModal };
