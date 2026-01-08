import { Control, Controller } from 'react-hook-form';
import { Text, View } from 'react-native';
import { CircleIcon } from '../ui/icon';
import { Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '../ui/radio';

/* -------------------- Single Radio Types -------------------- */

type BaseRadioItemProps = {
  label: string;
  value: string;
  isDisabled?: boolean;
  className?: string;
};

export type AppRadioItemProps = BaseRadioItemProps;

/* -------------------- Radio Group Types -------------------- */

type RadioOption = {
  label: string;
  value: string;
};

type BaseRadioGroupProps = {
  options: RadioOption[];
  isDisabled?: boolean;
  className?: string;
  error?: { message?: string } | string;
};

type ControlledRadioGroupProps = BaseRadioGroupProps & {
  name: string;
  control: Control<any>;
  rules?: any;
  value?: never;
  onChange?: never;
};

type UncontrolledRadioGroupProps = BaseRadioGroupProps & {
  name?: undefined;
  control?: undefined;
  rules?: undefined;
  value?: string;
  onChange?: (value: string) => void;
};

export type AppRadioGroupProps = ControlledRadioGroupProps | UncontrolledRadioGroupProps;

/* -------------------- Single Radio Component -------------------- */

export function AppRadio({ label, value, isDisabled, className }: AppRadioItemProps) {
  return (
    <Radio
      value={value}
      isDisabled={isDisabled}
      className={className || 'flex-row items-center gap-2'}
    >
      <RadioIndicator>
        <RadioIcon as={CircleIcon} />
      </RadioIndicator>
      <RadioLabel>{label}</RadioLabel>
    </Radio>
  );
}

/* -------------------- Radio Group Component -------------------- */

function AppRadioGroup(props: AppRadioGroupProps) {
  // 👉 Trường hợp dùng với React Hook Form
  if ('control' in props && props.control !== undefined) {
    const { name, control, rules, options, isDisabled, className, error } = props;

    return (
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange }, fieldState: { error: fieldError } }) => {
          const errorMessage = error
            ? typeof error === 'string'
              ? error
              : error.message
            : fieldError?.message;

          return (
            <View>
              <RadioGroupBase
                value={value}
                onChange={onChange}
                options={options}
                isDisabled={isDisabled}
                className={className}
                hasError={!!errorMessage}
              />
              {errorMessage ? (
                <Text style={{ color: '#ef4444', marginTop: 4, marginLeft: 4, fontSize: 13 }}>
                  {errorMessage}
                </Text>
              ) : null}
            </View>
          );
        }}
      />
    );
  }

  // 👉 Trường hợp dùng độc lập
  const { error, value = '', onChange, ...rest } = props;
  const handleChange = onChange ?? ((val: string) => {});
  const errorMessage = typeof error === 'string' ? error : error?.message;

  return (
    <View>
      <RadioGroupBase value={value} onChange={handleChange} {...rest} hasError={!!errorMessage} />
      {errorMessage ? (
        <Text style={{ color: '#ef4444', marginTop: 4, marginLeft: 4, fontSize: 13 }}>
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}

/* -------------------- Radio Group Base UI -------------------- */

type RadioGroupBaseProps = {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  isDisabled?: boolean;
  className?: string;
  hasError?: boolean;
};

function RadioGroupBase({
  value,
  onChange,
  options,
  isDisabled,
  className,
  hasError,
}: RadioGroupBaseProps) {
  return (
    <RadioGroup value={value} onChange={onChange} className={className}>
      {options.map((option) => (
        <Radio
          key={option.value}
          value={option.value}
          isDisabled={isDisabled}
          className="flex-row items-center gap-2"
        >
          <RadioIndicator className={hasError ? 'border-red-500' : undefined}>
            <RadioIcon as={CircleIcon} />
          </RadioIndicator>

          <RadioLabel className={hasError ? 'text-red-500' : undefined}>{option.label}</RadioLabel>
        </Radio>
      ))}
    </RadioGroup>
  );
}

/* -------------------- Compound Component Pattern -------------------- */

AppRadio.Group = AppRadioGroup;
