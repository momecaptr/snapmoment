import React, { useState } from 'react';

import TextArea, { TextAreaProps } from '@/shared/textArea/TextArea';

export type ControlledInputProps = {
  className?: string;
  currentValue?: string;
  resize?: boolean;
} & Omit<TextAreaProps, 'onChange' | 'value'>;

export const FormTextfieldArea = ({ currentValue, ...rest }: ControlledInputProps) => {
  const [value, setValue] = useState(currentValue || '');

  return <TextArea {...rest} onChange={(e) => setValue(e.target.value)} resize={rest.resize} value={value} />;
};
