import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { Input, InputProps } from '@/shared/ui';

export type ControlledInputProps<TFieldValues extends FieldValues> = {
  className?: string;
} & Omit<InputProps, 'onChange' | 'value'> &
  Omit<UseControllerProps<TFieldValues>, 'disabled' | 'rules'>;

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
    name,
    shouldUnregister: true
  });

  return <Input {...rest} {...field} error={error?.message} />;
};
