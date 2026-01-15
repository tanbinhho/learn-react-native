import React, { createContext, useContext } from 'react';
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
};

function AppCheckboxGroup({
  value = [],
  onChange,
  error,
  isDisabled,
  children,
}: AppCheckboxGroupProps) {
  return (
    <CheckboxGroupContext.Provider value={{ value, onChange, error, isDisabled }}>
      {children}
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
  const hasError = !!(typeof error === 'string' ? error : error?.message);

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

  // Group mode (array of string)
  const arr: string[] = Array.isArray(value) ? value : [];
  const checked = arr.includes(checkboxValue!);
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
  const hasError = !!(typeof (isGroup ? group.error : props.error) === 'string'
    ? isGroup
      ? group.error
      : props.error
    : isGroup
      ? group.error?.message
      : props.error?.message);

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
        value={props.checkboxValue}
        isChecked={checked}
        onChange={handleChange}
        isDisabled={group.isDisabled || props.isDisabled}
        className={props.className}
      >
        <CheckboxIndicator
          className={
            hasError
              ? 'border-red-500'
              : props.indicatorClassName ||
                'border-primary-600 data-[checked=true]:border-primary-600 data-[checked=true]:bg-primary-600'
          }
        >
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        {props.label && (
          <CheckboxLabel className={hasError ? 'text-red-500' : undefined}>
            {props.label}
          </CheckboxLabel>
        )}
      </Checkbox>
    );
  }
  // fallback to real implementation
  return <AppCheckboxImpl {...props} />;
}
PatchedAppCheckbox.Group = AppCheckboxGroup;
PatchedAppCheckbox.displayName = 'AppCheckbox';

export { PatchedAppCheckbox as AppCheckbox };
