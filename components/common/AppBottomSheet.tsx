import {
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetDragIndicator,
  BottomSheetPortal,
  BottomSheet as GluestackBottomSheet,
  useBottomSheetContext,
} from '@/components/ui/bottomsheet';
import { cn } from '@/utils/cn';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';

const DEFAULT_SNAP_POINTS = ['40%', '65%'];

type AppBottomSheetProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  snapPoints?: string[];
  snapToIndex?: number;
  showHandle?: boolean;
  dismissible?: boolean;
  contentClassName?: string;
};

type ControlledPortalProps = Omit<AppBottomSheetProps, 'onClose' | 'snapToIndex'> & {
  skipCloseRef: React.MutableRefObject<boolean>;
};

const ControlledPortal = ({
  open,
  snapPoints = DEFAULT_SNAP_POINTS,
  showHandle = true,
  dismissible = true,
  title,
  description,
  children,
  footer,
  contentClassName,
  skipCloseRef,
}: ControlledPortalProps) => {
  const { handleOpen, handleClose } = useBottomSheetContext();
  const previousOpen = React.useRef(false);

  React.useEffect(() => {
    if (open && !previousOpen.current) {
      handleOpen();
    } else if (!open && previousOpen.current) {
      skipCloseRef.current = true;
      handleClose();
    }
    previousOpen.current = open;
  }, [handleClose, handleOpen, open, skipCloseRef]);

  const renderBackdrop = React.useCallback(
    (backdropProps: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop
        {...backdropProps}
        pressBehavior={dismissible ? 'close' : 'none'}
        className="bg-background-dark/70"
      />
    ),
    [dismissible],
  );

  return (
    <BottomSheetPortal
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      handleComponent={showHandle ? BottomSheetDragIndicator : undefined}
      enablePanDownToClose={dismissible}
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: undefined })}
        keyboardVerticalOffset={Platform.select({ ios: 32, android: 0 })}
        style={{ flex: 1 }}
      >
        <BottomSheetContent
          className={cn(
            'pb-safe rounded-t-3xl border border-outline-100 bg-background-0 px-5 pt-3 shadow-hard-5',
            contentClassName,
          )}
        >
          {(title || description) && (
            <View className="mb-3 items-center gap-1">
              {title ? (
                <Text className="text-base font-semibold text-typography-900">{title}</Text>
              ) : null}
              {description ? (
                <Text className="text-sm text-typography-500">{description}</Text>
              ) : null}
            </View>
          )}

          <View className="w-full gap-3">{children}</View>

          {footer ? <View className="mt-4 border-t border-outline-100 pt-3">{footer}</View> : null}
        </BottomSheetContent>
      </KeyboardAvoidingView>
    </BottomSheetPortal>
  );
};

export const AppBottomSheet = ({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  snapPoints = DEFAULT_SNAP_POINTS,
  snapToIndex = 1,
  showHandle = true,
  dismissible = true,
  contentClassName,
}: AppBottomSheetProps) => {
  const skipCloseRef = React.useRef(false);

  const handleSheetClose = React.useCallback(() => {
    if (skipCloseRef.current) {
      skipCloseRef.current = false;
      return;
    }
    onClose();
  }, [onClose]);

  return (
    <GluestackBottomSheet snapToIndex={snapToIndex} onClose={handleSheetClose}>
      <ControlledPortal
        open={open}
        title={title}
        description={description}
        footer={footer}
        snapPoints={snapPoints}
        showHandle={showHandle}
        dismissible={dismissible}
        contentClassName={contentClassName}
        skipCloseRef={skipCloseRef}
      >
        {children}
      </ControlledPortal>
    </GluestackBottomSheet>
  );
};
