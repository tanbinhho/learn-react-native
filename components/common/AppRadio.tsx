import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type AppRadioProps = {
  value?: string;
  onChange?: (value: string) => void;
  radioValue?: string;
  label?: string;
  isDisabled?: boolean;
  className?: string;
};

type AppRadioGroupProps = {
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  children: React.ReactNode;
  name?: string;
  className?: string;
};

function AppRadioGroup({
  value = '',
  onChange,
  isDisabled,
  children,
  name,
  className,
}: AppRadioGroupProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          value,
          onChange,
          isDisabled,
        });
      })}
    </View>
  );
}

AppRadioGroup.displayName = 'AppRadioGroup';

function AppRadio({ value, onChange, radioValue, label, isDisabled, className }: AppRadioProps) {
  const checked = value === radioValue;
  const handleChange = () => {
    if (isDisabled) return;
    if (onChange && radioValue !== undefined) onChange(radioValue);
  };
  return (
    <Pressable
      onPress={handleChange}
      disabled={isDisabled}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        opacity: isDisabled ? 0.5 : 1,
      }}
    >
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 2,
          borderColor: checked ? '#2563eb' : '#ccc',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        {checked ? (
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: '#2563eb',
            }}
          />
        ) : null}
      </View>
      {label && <Text style={{ marginLeft: 8, color: '#222', fontSize: 16 }}>{label}</Text>}
    </Pressable>
  );
}

AppRadio.Group = AppRadioGroup;
AppRadio.displayName = 'AppRadio';

export { AppRadio };
