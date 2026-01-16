import React, { createContext, useContext } from 'react';
import { View } from 'react-native';
import { Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '../ui/checkbox';
import { CheckIcon } from '../ui/icon';

export type AppCheckboxProps = {
  value?: boolean | string[];
  onChange?: (value: boolean | string[]) => void;
  checkboxValue?: string;
  label?: string;
  isDisabled?: boolean;
  className?: string;
  error?: string | { message?: string };
  indicatorClassName?: string;
};

// Context for Checkbox Group
const CheckboxGroupContext = createContext<{
  value: string[];
  onChange?: (value: string[]) => void;
  error?: string | { message?: string };
  isDisabled?: boolean;
} | null>(null);

type AppCheckboxGroupProps = {
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string | { message?: string };
  isDisabled?: boolean;
  children: React.ReactNode;
  className?: string;
};

function AppCheckboxGroup({
  value = [],
  onChange,
  error,
  isDisabled,
  children,
  className,
}: AppCheckboxGroupProps) {
  // Truyền error xuống từng checkbox con
  const childrenWithError = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    // Only pass error if child is AppCheckbox
    if (child.type === PatchedAppCheckbox) {
      return React.cloneElement(child as React.ReactElement<any>, { error });
    }
    return child;
  });
  return (
    <CheckboxGroupContext.Provider value={{ value, onChange, error, isDisabled }}>
      <View className={className}>{childrenWithError}</View>
    </CheckboxGroupContext.Provider>
  );
}

AppCheckboxGroup.displayName = 'AppCheckboxGroup';

// --- Real Checkbox Implementation ---
function AppCheckboxImpl({
  value,
  onChange,
  checkboxValue,
  label,
  isDisabled,
  className,
  error,
  indicatorClassName,
}: AppCheckboxProps) {
  // Không highlight đỏ khi có lỗi

  // Boolean mode (single checkbox, no checkboxValue)
  if (checkboxValue === undefined) {
    const checked = !!value;
    const handleChange = () => {
      if (onChange) onChange(!checked);
    };
    return (
      <Checkbox
        value={label ?? 'checkbox'}
        isChecked={checked}
        onChange={handleChange}
        isDisabled={isDisabled}
        className={className}
      >
        <CheckboxIndicator
          className={
            indicatorClassName ||
            'border-primary-600 data-[checked=true]:border-primary-600 data-[checked=true]:bg-primary-600'
          }
        >
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        {label && <CheckboxLabel>{label}</CheckboxLabel>}
      </Checkbox>
    );
  }

  // Group mode (array of string)
  const arr: string[] = Array.isArray(value) ? value : [];
  const checked = arr.includes(checkboxValue!);
  const hasError = !!error && (typeof error === 'string' ? !!error : !!error.message);
  const handleChange = () => {
    if (!onChange) return;
    if (checked) {
      onChange(arr.filter((v) => v !== checkboxValue));
    } else {
      onChange([...arr, checkboxValue!]);
    }
  };

  return (
    <Checkbox
      value={checkboxValue}
      isChecked={checked}
      onChange={handleChange}
      isDisabled={isDisabled}
      className={className}
    >
      <CheckboxIndicator
        className={
          hasError
            ? 'border-red-500'
            : indicatorClassName ||
              'border-primary-600 data-[checked=true]:border-primary-600 data-[checked=true]:bg-primary-600'
        }
      >
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      {label && (
        <CheckboxLabel className={hasError ? 'text-red-500' : undefined}>{label}</CheckboxLabel>
      )}
    </Checkbox>
  );
}

// --- Patched Checkbox with Group Context ---
function PatchedAppCheckbox(props: AppCheckboxProps) {
  const group = useContext(CheckboxGroupContext);
  const isGroup = !!group && typeof props.checkboxValue === 'string' && Array.isArray(group.value);

  if (isGroup) {
    const arr = group.value || [];
    const checked = arr.includes(props.checkboxValue!);
    const handleChange = () => {
      if (!group.onChange) return;
      if (checked) {
        group.onChange(arr.filter((v) => v !== props.checkboxValue));
      } else {
        group.onChange([...arr, props.checkboxValue!]);
      }
    };
    return (
      <Checkbox
        value={props.checkboxValue ?? ''}
        isChecked={checked}
        onChange={handleChange}
        isDisabled={group.isDisabled || props.isDisabled}
        className={props.className}
      >
        <CheckboxIndicator
          className={
            props.indicatorClassName ||
            'border-primary-600 data-[checked=true]:border-primary-600 data-[checked=true]:bg-primary-600'
          }
        >
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        {props.label && <CheckboxLabel>{props.label}</CheckboxLabel>}
      </Checkbox>
    );
  }
  // fallback to real implementation
  return <AppCheckboxImpl {...props} />;
}
PatchedAppCheckbox.Group = AppCheckboxGroup;
PatchedAppCheckbox.displayName = 'AppCheckbox';

export { PatchedAppCheckbox as AppCheckbox };
