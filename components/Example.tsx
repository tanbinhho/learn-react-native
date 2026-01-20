import React, { useState } from 'react';
import { AppBottomSheet } from '../components/common/AppBottomSheet';
import { AppButton } from '../components/common/AppButton';
import { BottomSheetItem, BottomSheetItemText } from '../components/ui/bottomsheet';

const ExampleScreen = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppButton onPress={() => setOpen(true)} title="Open Bottom Sheet" />
      <AppBottomSheet open={open} onClose={() => setOpen(false)}>
        <BottomSheetItem onPress={() => {}}>
          <BottomSheetItemText>Option 1</BottomSheetItemText>
        </BottomSheetItem>
        <BottomSheetItem onPress={() => {}}>
          <BottomSheetItemText>Option 2</BottomSheetItemText>
        </BottomSheetItem>
      </AppBottomSheet>
    </>
  );
};

export default ExampleScreen;
