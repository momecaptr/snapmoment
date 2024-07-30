import { FieldValues, UseControllerProps, useController } from 'react-hook-form';

import { Checkbox, CheckboxPropsProps } from '@/shared/ui';

type Props<T extends FieldValues> = Omit<CheckboxPropsProps, 'checked' | 'name' | 'onBlur' | 'onCheckedChange'> &
  UseControllerProps<T>;

export const FormCheckbox = <T extends FieldValues>({ control, name, ...rest }: Props<T>) => {
  const {
    field: { onChange, value = rest.defaultChecked, ...field },
    fieldState: { error }
  } = useController({
    control,
    name
  });

  return <Checkbox {...rest} {...field} checked={value} error={error?.message} onCheckedChange={onChange} />;
};
