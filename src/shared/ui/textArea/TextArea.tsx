import { ChangeEvent, ComponentPropsWithoutRef, forwardRef, useEffect, useId, useState } from 'react';

import clsx from 'clsx';

import s from './TextArea.module.scss';

export type TextAreaProps = {
  callback?: (text: string) => void;
  classNameTextAreaSize?: string; // ! ДОБАВИЛ
  counterValue?: string; // ! ДОБАВИЛ
  currentValue?: string;
  error?: string | undefined;
  label?: string;
  resize?: boolean;
} & ComponentPropsWithoutRef<'textarea'>;

/**
 * Компонент `TextArea` — это расширяемое текстовое поле с поддержкой:
 * - кастомного размера через `classNameTextAreaSize`
 * - счетчика символов с помощью `counterValue`
 * - управления значением через `currentValue`
 * - отображения ошибки через `error`
 * - отображения заголовка через `label`
 * - настройки возможности изменения размера через `resize`
 *
 * @param {function} callback - Опциональная функция для обработки изменения текста.
 * @param {string} classNameTextAreaSize - Дополнительный класс для изменения размера textarea.
 * @param {string} counterValue - Значение для отображения счетчика символов.
 * @param {string} currentValue - Текущее значение textarea.
 * @param {string} error - Ошибка для отображения под textarea.
 * @param {string} label - Заголовок, отображаемый над textarea.
 * @param {boolean} resize - Включение/выключение возможности изменения размера textarea.
 * @param {ComponentPropsWithoutRef<'textarea'>} restProps - Остальные стандартные свойства элемента <textarea>.
 */
export const TextArea = forwardRef<HTMLInputElement, TextAreaProps>((props: TextAreaProps, ref) => {
  const {
    callback,
    className,
    classNameTextAreaSize,
    counterValue,
    currentValue,
    error,
    id,
    label,
    placeholder,
    resize,
    ...restProps
  } = props;
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
    classNameForTextArea = clsx(s.boxTextArea, s.error, classNameTextAreaSize);
  } else {
    classNameForTextArea = clsx(s.boxTextArea, classNameTextAreaSize);
  }

  return (
    <div className={clsx(s.box, className)}>
      {label && <div className={error ? s.error : s.label}>{label}</div>}
      <div>
        {/* ! ДОБАВИЛ КЛАСС */}
        <textarea
          {...restProps}
          className={resize ? clsx(classNameForTextArea, s.resize) : classNameForTextArea}
          id={id ?? generatedId}
          onChange={handleChange}
          placeholder={placeholder}
          value={inputValue}
        />
        {/* ! ДОБАВИЛ counter */}
        {counterValue && <div className={s.counterValue}>{counterValue}</div>}
      </div>
      {error && <div className={s.error}>{error}</div>}
    </div>
  );
});
