import React from 'react';
import { CircleIcon } from '../ui/icon';
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '../ui/radio';

export type AppRadioProps = {
  value?: string;
  onChange?: (value: string) => void;
  radioValue?: string;
  label?: string;
  isDisabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

type AppRadioGroupProps = {
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  children: React.ReactNode;
  name?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

function AppRadioGroup({
  value = '',
  onChange,
  isDisabled,
  children,
  name,
  className,
  size = 'md',
}: AppRadioGroupProps) {
  return (
    <RadioGroup value={value} onChange={onChange} isDisabled={isDisabled} className={className}>
      {children}
    </RadioGroup>
  );
}

AppRadioGroup.displayName = 'AppRadioGroup';

function AppRadio({
  value,
  onChange,
  radioValue,
  label,
  isDisabled,
  className,
  size = 'md',
}: AppRadioProps) {
  return (
    <Radio
      value={radioValue || ''}
      isDisabled={isDisabled}
      onPress={() => {
        if (isDisabled) return;
        if (onChange && radioValue !== undefined) onChange(radioValue);
      }}
      className={className}
      size={size}
    >
      <RadioIndicator>
        <RadioIcon as={CircleIcon} />
      </RadioIndicator>
      {label && <RadioLabel>{label}</RadioLabel>}
    </Radio>
  );
}

AppRadio.Group = AppRadioGroup;
AppRadio.displayName = 'AppRadio';

export { AppRadio };
