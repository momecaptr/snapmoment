import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useEffect, useState } from 'react';

import EyeOff from '@/../public/assets/components/EyeOff'; //'@/assets/icons/svg/EyeOff'
import Close from '@/../public/assets/components/Close';
import Eye from '@/../public/assets/components/Eye';
import Search from '@/../public/assets/components/Search';
import { useAutoId } from '@/shared/lib';
import { Button, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './Input.module.scss';

export type InputProps = {
  callback?: (text: string) => void;
  currentValue?: string;
  error?: string | undefined;
  label?: string;
} & ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>((props: InputProps, ref) => {
  const { callback, className, currentValue, error, id, label, placeholder, type, ...restProps } = props;
  const generatedId = useAutoId(id);
  const [isShow, setIsShow] = useState(false);
  const [inputValue, setInputValue] = useState(currentValue || '');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    props.onChange?.(e);
    setInputValue(e.target.value);
  }
  const clearInput = () => {
    setInputValue('');
    if (callback) {
      callback('');
    }
  };
  // ! ЗАЧЕМ ЭТА ФУНКЦИЯ? Ощущение что она вообще не нужна, ведь фокусировка по умолчанию предусмотрена, при клике
  const focusOnInput = () => {
    const inputElement = document.getElementById(id ?? generatedId);

    inputElement?.focus();
  };

  useEffect(() => {
    props.currentValue === '' && setInputValue('');
  }, [props.currentValue]);

  const isShowChangeHandler = () => {
    setIsShow(!isShow);
  };
  const EyeIcon = isShow ? Eye : EyeOff;

  let classNameForInput = '';

  switch (type) {
    case 'search':
      classNameForInput = error ? clsx(s.boxInput, s.errorSeach) : clsx(s.boxInput, s.boxPadding);
      break;
    case 'email': {
      classNameForInput = error
        ? clsx(s.boxInputForText, s.boxInput, s.errorTextAndPassword)
        : clsx(s.boxInputForText, s.boxInput, inputValue.length === 0 && s.placeholder);
      break;
    }
    case 'password':
      classNameForInput = error
        ? clsx(s.boxInputForText, s.boxInput, s.errorTextAndPassword)
        : clsx(s.boxInputForText, s.boxInput, inputValue.length === 0 && s.placeholder);
      break;
    case 'text':
      classNameForInput = error
        ? clsx(s.boxInputForText, s.boxInput, s.errorTextAndPassword)
        : clsx(s.boxInputForText, s.boxInput, inputValue.length === 0 && s.placeholder);
      break;
    default:
      classNameForInput = s.boxInput;
  }

  const styleForType = isShow ? 'text' : 'password';

  return (
    <div className={clsx(s.box, className)}>
      <Typography as={'label'} className={s.label} htmlFor={id ?? generatedId} variant={'regular_text_16'}>
        {type !== 'search' && label}
      </Typography>
      <div className={s.searchClose}>
        {type === 'search' && (
          <div>
            <Search className={s.Search} onClick={focusOnInput} viewBox={'0 0 24 24'} />
          </div>
        )}
        <input
          {...restProps}
          className={classNameForInput}
          id={generatedId}
          onChange={handleChange}
          placeholder={placeholder}
          ref={ref}
          type={type === 'password' ? styleForType : type}
          value={inputValue}
        />
        {type === 'password' && inputValue.length > 0 && (
          <Button className={s.Eye} onClick={isShowChangeHandler} type={'button'} variant={'text'}>
            <EyeIcon viewBox={'0 0 24 24'} />
          </Button>
        )}

        <div>
          {type === 'search' && inputValue.length > 0 && (
            <Button className={s.Close} onClick={clearInput}>
              <Close viewBox={'0 0 24 24'} />
            </Button>
          )}
        </div>
      </div>
      {error && <div className={s.errorText}>{error}</div>}
    </div>
  );
});

Input.displayName = 'Input';
