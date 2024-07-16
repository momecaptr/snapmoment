'use client';
import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

import Checkbox, { CheckboxPropsProps } from '@/shared/ui/checkbox/Checkbox';

type Props<T extends FieldValues> = Omit<CheckboxPropsProps, 'checked' | 'name' | 'onBlur' | 'onCheckedChange'> &
  UseControllerProps<T>;

export function FormCheckbox<T extends FieldValues>({ control, name, ...rest }: Props<T>) {
  const {
    field: { onChange, value = rest.defaultChecked, ...field }
  } = useController({
    control,
    name
  });

  return <Checkbox {...rest} {...field} checked={value} onCheckedChange={onChange} />;
}
