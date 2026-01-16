import { cn } from '@/utils/cn';
import React from 'react';
import {
  FormProvider,
  RegisterOptions,
  useController,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form';
import { Text, View } from 'react-native';

// -------------------- AppForm Props --------------------
export interface AppFormProps {
  children: React.ReactNode;
  className?: string;
  form: UseFormReturn<any>;
}

function AppForm({ children, className, form }: AppFormProps) {
  return (
    <FormProvider {...form}>
      <View className={cn(className)}>{children}</View>
    </FormProvider>
  );
}

// -------------------- AppForm.Item Props --------------------

export interface AppFormItemProps {
  name: string;
  label?: string;
  rules?: RegisterOptions;
  children: React.ReactNode;
  className?: string;
}

function AppFormItem({ name, label, rules, children, className }: AppFormItemProps) {
  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <View className={cn('mb-4', className)}>
      {label && <Text className="mb-1 font-semibold text-gray-900">{label}</Text>}
      {React.isValidElement(children)
        ? (() => {
            // AppCheckbox group support
            const type: any = children.type;
            // Check for AppCheckbox (single or group)
            if (type && (type.name === 'AppCheckbox' || type.displayName === 'AppCheckbox')) {
              // If it's a group, inject value/onChange/error to the group
              if (
                typeof type.Group === 'function' &&
                type.Group.displayName === 'AppCheckboxGroup' &&
                children.props &&
                typeof children.props === 'object' &&
                'children' in children.props
              ) {
                return React.cloneElement(children as React.ReactElement<any>, {
                  value,
                  onChange,
                  error,
                });
              }
              // Single checkbox
              return React.cloneElement(children as React.ReactElement<any>, {
                value,
                onChange,
                error,
              });
            }
            // AppCheckbox.Group (direct usage)
            if (
              type &&
              ((typeof type.displayName === 'string' && type.displayName === 'AppCheckboxGroup') ||
                (typeof type.name === 'string' && type.name === 'AppCheckboxGroup'))
            ) {
              return React.cloneElement(children as React.ReactElement<any>, {
                value,
                onChange,
                error,
              });
            }
            // AppSwitch
            if (type && type.name === 'AppSwitch') {
              return React.cloneElement(children as React.ReactElement<any>, {
                value,
                onChange,
                onBlur,
                error: error?.message,
              });
            }
            // AppInput and others
            return React.cloneElement(children as React.ReactElement<any>, {
              value,
              onChangeText: onChange,
              onBlur,
              error: error?.message,
            });
          })()
        : children}
      {error?.message && (
        <Text className="mt-1 text-[13px] font-medium text-red-500">{error.message}</Text>
      )}
    </View>
  );
}

AppForm.Item = AppFormItem;

export { AppForm };
export default AppForm;
