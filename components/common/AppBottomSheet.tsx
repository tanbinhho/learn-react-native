import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { useEffect, useRef } from 'react';

import { View } from 'react-native';
import { AppButton, AppButtonProps } from './AppButton';
import { AppText } from './AppText';

export interface AppBottomSheetProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  fitContent?: boolean;
  snapPoints?: string[];
  title?: string | React.ReactNode;
  footer?: React.ReactNode | null;
  okText?: string;
  okProps?: Partial<AppButtonProps>;
  cancelText?: string;
  cancelProps?: AppButtonProps;
}

export const AppBottomSheet: React.FC<AppBottomSheetProps> = ({
  open,
  onClose,
  children,
  fitContent = false,
  snapPoints = ['50%', '90%'],
  title,
  footer,
  okText = 'OK',
  okProps = {},
  cancelText = 'Cancel',
  cancelProps = {},
}) => {
  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (open) {
      sheetRef.current?.snapToIndex(0);
    } else {
      sheetRef.current?.close();
    }
  }, [open]);

  // Always show backdrop regardless of index
  const CustomBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
      pressBehavior="close"
    />
  );

  // Render title
  let renderedTitle: React.ReactNode = null;
  if (title) {
    renderedTitle =
      typeof title === 'string' ? <AppText.Label className="mb-3">{title}</AppText.Label> : title;
  }

  // Render footer
  let renderedFooter: React.ReactNode = null;
  if (footer === null) {
    renderedFooter = null;
  } else if (footer !== undefined) {
    renderedFooter = footer;
  } else {
    renderedFooter = (
      <View className="mt-4 flex-row gap-2">
        <AppButton title={cancelText} onPress={onClose} block {...cancelProps} />
        <AppButton title={okText} variant="filled" color="info" block {...okProps} />
      </View>
    );
  }

  return (
    <Portal>
      <BottomSheet
        ref={sheetRef}
        index={open ? 0 : -1}
        snapPoints={fitContent ? undefined : snapPoints}
        enableDynamicSizing={fitContent}
        enablePanDownToClose
        backdropComponent={CustomBackdrop}
        onChange={(i) => i === -1 && onClose()}
      >
        <BottomSheetView className="p-2.5 !pt-0">
          {renderedTitle}
          {children}
          {renderedFooter}
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
};
