import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useEffect, useState } from 'react';

import EyeOff from '@/../public/assets/components/EyeOff'; //'@/assets/icons/svg/EyeOff'
import Close from '@/../public/assets/components/Close';
import Eye from '@/../public/assets/components/Eye';
import Search from '@/../public/assets/components/Search';
import { useAutoId } from '@/shared/lib';
import { Button, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './Input.module.scss';

import PinOutline from '../../../../public/assets/components/PinOutline';

export type InputProps = {
  callback?: (text: string) => void;
  currentValue?: string;
  error?: string | undefined;
  label?: string;
} & ComponentPropsWithoutRef<'input'>;

/**
 * Компонент `Input` — настраиваемое поле ввода, поддерживающее различные типы ввода
 * и функционал, включая отображение ошибок, очистку поля и обработку кликов по иконкам.
 *
 * @param {function} callback - Функция обратного вызова, вызываемая при изменении значения поля ввода.
 * @param {string} currentValue - Текущее значение поля ввода (по умолчанию пустая строка).
 * @param {string | undefined} error - Сообщение об ошибке, которое отображается под полем ввода (если есть).
 * @param {string} label - Метка, отображаемая над полем ввода.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} restProps - Остальные атрибуты для элемента <input>,
 * которые могут быть переданы, включая `type`, `placeholder` и т.д.
 */
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

  // ! ДОБАВИЛ ЭТУ ФУНКЦИЮ ДЛЯ КЛИКА ПО LOCATION. ПОКА НИЧЕГО НЕ ДОБАВЛЕНО
  const handleLocationClick = () => {
    console.log('Location icon clicked');
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
      classNameForInput = error ? clsx(s.boxInput, s.errorSearch) : clsx(s.boxInput, s.boxPadding);
      break;
    case 'email':
    case 'password':
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
      <Typography as={'label'} className={s.label} htmlFor={id ?? generatedId} variant={'regular_text_14'}>
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

        {type === 'search' && inputValue.length > 0 && (
          <Button className={s.Close} onClick={clearInput}>
            <Close viewBox={'0 0 24 24'} />
          </Button>
        )}

        {type === 'location' && (
          <Button className={s.Location} onClick={handleLocationClick} type={'button'} variant={'text'}>
            <PinOutline viewBox={'0 0 24 24'} />
          </Button>
        )}
      </div>
      {error && <div className={s.errorText}>{error}</div>}
    </div>
  );
});

Input.displayName = 'Input';
