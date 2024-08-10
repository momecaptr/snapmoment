import React, { useEffect, useState } from 'react';

import CalendarOutline from '@/../public/assets/components/CalendarOutline';
import { getDateFromInputValue, getInputValueFromDate } from '@/shared/ui/datePicker/lib/utils';
import { DatePickerPopupContent } from '@/shared/ui/datePicker/ui/DatePickerPopupContent';
import { clsx } from 'clsx';

import s from './DatePicker.module.scss';

import { useShowPopup } from '../lib/hooks/useShowPopup';

interface DatePickerProps {
  error?: boolean;
  name?: string;
  onChange: (value: string) => void;
  value: string;
}

export const DatePicker = ({ error, name, onChange, value }: DatePickerProps) => {
  const [inputValue, setInputValue] = useState<string>(getInputValueFromDate(new Date(value)));
  const [isValidInputValue, setIsValidInputValue] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date(value));

  const { elementRef, handleInputClick, setShowPopup, showPopup } = useShowPopup();

  useEffect(() => {
    setInputValue(getInputValueFromDate(new Date(value)));
    setCurrentDate(new Date(value));
  }, [value]);

  const handleChange = (valueDate: Date) => {
    setIsValidInputValue(!!getDateFromInputValue(inputValue));
    if (isValidInputValue) {
      const dateString = valueDate.toISOString(); // Используйте ISO формат

      onChange(dateString);
      setInputValue(getInputValueFromDate(valueDate));
    }
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.currentTarget.value;

    setInputValue(newInputValue);
    const date = getDateFromInputValue(newInputValue);

    if (date) {
      setIsValidInputValue(true);
      setCurrentDate(date);
      onChange(date.toISOString());
    } else {
      setIsValidInputValue(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }

    const dateOnPressEnter = getDateFromInputValue(inputValue);

    if (dateOnPressEnter) {
      handleChange(dateOnPressEnter);
    }
  };

  if (!isValidInputValue && showPopup) {
    setShowPopup(false);
  }

  return (
    <div className={clsx(s.datePicker, showPopup && s.showPopup)} ref={elementRef}>
      <input
        className={clsx(
          s.datePickerInput,
          !isValidInputValue && s.datePickerInputInvalid,
          error && s.datePickerInputInvalid
        )}
        onBlur={() => {
          const dateOnBlur = getDateFromInputValue(inputValue);

          if (dateOnBlur) {
            handleChange(dateOnBlur);
          }
        }}
        name={name}
        onChange={onInputValueChange}
        onClick={handleInputClick}
        onKeyDown={onKeyDown}
        type={'text'}
        value={inputValue}
      />
      <CalendarOutline color={isValidInputValue ? '' : 'var(--danger-100)'} />
      {showPopup && (
        <div className={s.datePickerPopup}>
          <DatePickerPopupContent
            inputValueDate={new Date(value)}
            onChange={handleChange}
            selectedValue={currentDate}
            setShowPopup={setShowPopup}
          />
        </div>
      )}
    </div>
  );
};
