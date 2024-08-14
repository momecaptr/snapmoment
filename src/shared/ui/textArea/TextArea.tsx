import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useEffect, useId, useState } from 'react';

import clsx from 'clsx';

import s from './TextArea.module.scss';

export type TextAreaProps = {
  callback?: (text: string) => void;
  currentValue?: string;
  error?: string | undefined;
  label?: string;
  resize?: boolean;
} & ComponentPropsWithoutRef<'textarea'>;

export const TextArea = forwardRef<HTMLInputElement, TextAreaProps>((props: TextAreaProps, ref) => {
  const { callback, className, currentValue, error, id, label, placeholder, resize, ...restProps } = props;
  const [inputValue, setInputValue] = useState(currentValue || '');

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    props.onChange?.(e);
    setInputValue(e.target.value);
  }
  const clearInput = () => {
    setInputValue('');
    if (callback) {
      callback('');
    }
  };
  const focusOnInput = () => {
    const inputElement = document.getElementById(id ?? generatedId);

    inputElement?.focus();
  };

  useEffect(() => {
    props.currentValue === '' && setInputValue('');
  }, [props.currentValue]);

  const generatedId = useId();
  let classNameForTextArea = '';

  if (error) {
    classNameForTextArea = clsx(s.boxTextArea, s.error);
  } else {
    classNameForTextArea = clsx(s.boxTextArea);
  }

  return (
    <div className={clsx(s.box, className)}>
      {label && <div className={error ? s.error : s.label}>{label}</div>}
      <div>
        <textarea
          {...restProps}
          className={resize ? clsx(classNameForTextArea, s.resize) : classNameForTextArea}
          id={id ?? generatedId}
          onChange={handleChange}
          placeholder={placeholder}
          value={inputValue}
        />
      </div>
      {error && <div className={s.error}>{error}</div>}
    </div>
  );
});
