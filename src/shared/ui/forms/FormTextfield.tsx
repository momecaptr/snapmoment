import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { Input, InputProps } from '@/shared/ui';

export type ControlledInputProps<TFieldValues extends FieldValues> = {
  className?: string;
} & {
  currentValue?: TFieldValues[Extract<keyof TFieldValues, string>];
} & Omit<InputProps, 'onChange' | 'value'> &
  Omit<UseControllerProps<TFieldValues>, 'defaultValue' | 'disabled' | 'rules'>;

export const FormTextfield = <TFieldValues extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledInputProps<TFieldValues>) => {
  const {
    field,
    fieldState: { error }
  } = useController<TFieldValues>({
    control,
    defaultValue: rest.currentValue,
    disabled: rest.disabled,
    name,
    shouldUnregister: true
  });

  return <Input {...rest} {...field} error={error?.message} />;
};
