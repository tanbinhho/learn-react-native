'use client';

import { PrimitiveIcon, UIIcon } from '@gluestack-ui/core/icon/creator';
import { createSelect } from '@gluestack-ui/core/select/creator';
import type { VariantProps } from '@gluestack-ui/utils/nativewind-utils';
import { tva, useStyleContext, withStyleContext } from '@gluestack-ui/utils/nativewind-utils';
import { cssInterop } from 'nativewind';
import React from 'react';
import { Pressable, TextInput, View } from 'react-native';
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetFlatList,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetScrollView,
  ActionsheetSectionHeaderText,
  ActionsheetSectionList,
  ActionsheetVirtualizedList,
} from './select-actionsheet';

const SelectTriggerWrapper = React.forwardRef<
  React.ComponentRef<typeof Pressable>,
  React.ComponentProps<typeof Pressable>
>(function SelectTriggerWrapper({ ...props }, ref) {
  return <Pressable {...props} ref={ref} />;
});

const selectIconStyle = tva({
  base: 'text-typography-400 fill-none',
  parentVariants: {
    size: {
      '2xs': 'h-3 w-3',
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-5 w-5',
      xl: 'h-6 w-6',
    },
  },
});

const selectStyle = tva({
  base: '',
});

const selectTriggerStyle = tva({
  base: 'border border-outline-300 rounded-xl flex-row items-center overflow-hidden data-[hover=true]:border-primary-400 data-[focus=true]:border-primary-500 data-[focus=true]:bg-primary-50 data-[disabled=true]:opacity-40 data-[disabled=true]:bg-background-100 data-[disabled=true]:data-[hover=true]:border-outline-300 bg-background-0 shadow-sm',
  variants: {
    size: {
      xl: 'h-14',
      lg: 'h-12',
      md: 'h-11',
      sm: 'h-10',
    },
    variant: {
      underlined:
        'border-0 border-b rounded-none bg-transparent shadow-none data-[hover=true]:border-primary-500 data-[focus=true]:border-primary-500 data-[focus=true]:web:shadow-[inset_0_-2px_0_0] data-[focus=true]:web:shadow-primary-500 data-[invalid=true]:border-error-500 data-[invalid=true]:web:shadow-error-500',
      outline:
        'data-[focus=true]:border-primary-500 data-[focus=true]:shadow-md data-[invalid=true]:border-error-500 data-[invalid=true]:bg-error-50',
      rounded:
        'rounded-full data-[focus=true]:border-primary-500 data-[focus=true]:shadow-md data-[invalid=true]:border-error-500 data-[invalid=true]:bg-error-50',
    },
  },
});

const selectInputStyle = tva({
  base: 'px-4 placeholder:text-typography-400 web:w-full h-full text-typography-900 pointer-events-none web:outline-none ios:leading-[0px] py-0 font-medium',
  parentVariants: {
    size: {
      xl: 'text-lg',
      lg: 'text-base',
      md: 'text-base',
      sm: 'text-sm',
    },
    variant: {
      underlined: 'px-0',
      outline: '',
      rounded: 'px-5',
    },
  },
});

const UISelect = createSelect(
  {
    Root: View,
    Trigger: withStyleContext(SelectTriggerWrapper),
    Input: TextInput,
    Icon: UIIcon,
  },
  {
    Portal: Actionsheet,
    Backdrop: ActionsheetBackdrop,
    Content: ActionsheetContent,
    DragIndicator: ActionsheetDragIndicator,
    DragIndicatorWrapper: ActionsheetDragIndicatorWrapper,
    Item: ActionsheetItem,
    ItemText: ActionsheetItemText,
    ScrollView: ActionsheetScrollView,
    VirtualizedList: ActionsheetVirtualizedList,
    FlatList: ActionsheetFlatList,
    SectionList: ActionsheetSectionList,
    SectionHeaderText: ActionsheetSectionHeaderText,
  },
);

cssInterop(UISelect, { className: 'style' });
cssInterop(UISelect.Input, {
  className: { target: 'style', nativeStyleToProp: { textAlign: true } },
});
cssInterop(SelectTriggerWrapper, { className: 'style' });

cssInterop(PrimitiveIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
});

type ISelectProps = VariantProps<typeof selectStyle> &
  React.ComponentProps<typeof UISelect> & { className?: string };

const Select = React.forwardRef<React.ComponentRef<typeof UISelect>, ISelectProps>(function Select(
  { className, ...props },
  ref,
) {
  return (
    <UISelect
      className={selectStyle({
        class: className,
      })}
      ref={ref}
      {...props}
    />
  );
});

type ISelectTriggerProps = VariantProps<typeof selectTriggerStyle> &
  React.ComponentProps<typeof UISelect.Trigger> & { className?: string };

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof UISelect.Trigger>,
  ISelectTriggerProps
>(function SelectTrigger({ className, size = 'md', variant = 'outline', ...props }, ref) {
  return (
    <UISelect.Trigger
      className={selectTriggerStyle({
        class: className,
        size,
        variant,
      })}
      ref={ref}
      context={{ size, variant }}
      {...props}
    />
  );
});

type ISelectInputProps = VariantProps<typeof selectInputStyle> &
  React.ComponentProps<typeof UISelect.Input> & { className?: string };

const SelectInput = React.forwardRef<React.ComponentRef<typeof UISelect.Input>, ISelectInputProps>(
  function SelectInput({ className, ...props }, ref) {
    const { size: parentSize, variant: parentVariant } = useStyleContext();
    return (
      <UISelect.Input
        className={selectInputStyle({
          class: className,
          parentVariants: {
            size: parentSize,
            variant: parentVariant,
          },
        })}
        ref={ref}
        {...props}
      />
    );
  },
);

type ISelectIcon = VariantProps<typeof selectIconStyle> &
  React.ComponentProps<typeof UISelect.Icon> & { className?: string };

const SelectIcon = React.forwardRef<React.ComponentRef<typeof UISelect.Icon>, ISelectIcon>(
  function SelectIcon({ className, size, ...props }, ref) {
    const { size: parentSize } = useStyleContext();
    if (typeof size === 'number') {
      return (
        <UISelect.Icon
          ref={ref}
          {...props}
          className={selectIconStyle({ class: className })}
          size={size}
        />
      );
    } else if (
      //@ts-expect-error : web only
      (props?.height !== undefined || props?.width !== undefined) &&
      size === undefined
    ) {
      return (
        <UISelect.Icon ref={ref} {...props} className={selectIconStyle({ class: className })} />
      );
    }
    return (
      <UISelect.Icon
        className={selectIconStyle({
          class: className,
          size,
          parentVariants: {
            size: parentSize,
          },
        })}
        ref={ref}
        {...props}
      />
    );
  },
);

Select.displayName = 'Select';
SelectTrigger.displayName = 'SelectTrigger';
SelectInput.displayName = 'SelectInput';
SelectIcon.displayName = 'SelectIcon';

// Actionsheet Components
const SelectPortal = UISelect.Portal;
const SelectBackdrop = UISelect.Backdrop;
const SelectContent = UISelect.Content;
const SelectDragIndicator = UISelect.DragIndicator;
const SelectDragIndicatorWrapper = UISelect.DragIndicatorWrapper;
const SelectItem = UISelect.Item;
const SelectScrollView = UISelect.ScrollView;
const SelectVirtualizedList = UISelect.VirtualizedList;
const SelectFlatList = UISelect.FlatList;
const SelectSectionList = UISelect.SectionList;
const SelectSectionHeaderText = UISelect.SectionHeaderText;

export {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectFlatList,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectScrollView,
  SelectSectionHeaderText,
  SelectSectionList,
  SelectTrigger,
  SelectVirtualizedList,
};
