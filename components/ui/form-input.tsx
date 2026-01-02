import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

export interface FormInputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: FieldError;
  rules?: any;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
export function FormInput({
  name,
  control,
  label,
  error,
  rules,
  icon,
  rightIcon,
  ...props
}: FormInputProps) {
  return (
    <View style={styles.group}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputWrap}>
            {icon && <View style={styles.iconLeft}>{icon}</View>}
            <TextInput
              style={[
                styles.input,
                icon ? styles.inputWithIcon : undefined,
                rightIcon ? styles.inputWithIconRight : undefined,
                error ? styles.inputError : undefined,
                props.style,
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#cbd6ff"
              {...props}
            />
            {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
          </View>
        )}
      />
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#e6eefc', // Light label for dark gradient background
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: 'rgba(255,255,255,0.06)', // subtle translucent field
    color: '#ffffff', // light text for dark gradient
    fontWeight: '500',
    letterSpacing: 0.1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  inputWrap: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconLeft: {
    position: 'absolute',
    left: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 2,
  },
  iconRight: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 2,
  },
  inputWithIcon: {
    paddingLeft: 44,
  },
  inputWithIconRight: {
    paddingRight: 44,
  },
  inputError: {
    borderColor: '#ff5a5f',
  },
  error: {
    color: '#ff5a5f',
    fontSize: 13,
    marginTop: 2,
  },
});
