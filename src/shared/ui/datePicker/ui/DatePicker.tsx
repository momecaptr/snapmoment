import React, { useState } from 'react';

import { getDateFromInputValue, getInputValueDate, useShowPopup } from '@/shared/ui/datePicker/lib';
import { DatePickerPopupContent } from '@/shared/ui/datePicker/ui/DatePickerPopupContent';
import { clsx } from 'clsx';

import s from './DatePicker.module.scss';

import { CalendarOutline } from '../../../../../public/assets/components';

export interface DatePickerProps {
  name?: string;
  onChange: (value: Date) => void;
  value: Date;
}

export const DatePicker = ({ name, onChange, value }: DatePickerProps) => {
  const { elementRef, handleInputClick, setShowPopup, showPopup } = useShowPopup();
  const [inputValue, setInputValue] = useState<string>(getInputValueDate(value));
  const [isValidInputValue, setIsValidInputValue] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(value);

  const handleChange = (valueDate: Date) => {
    setIsValidInputValue(!!getDateFromInputValue(inputValue));
    if (isValidInputValue) {
      onChange(valueDate);
      setInputValue(getInputValueDate(valueDate));
    }
  };

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
    setIsValidInputValue(!!getDateFromInputValue(e.currentTarget.value));

    const date = getDateFromInputValue(e.currentTarget.value);

    if (date) {
      setCurrentDate(date);
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
        onBlur={() => {
          const dateOnPressEnter = getDateFromInputValue(inputValue);

          if (dateOnPressEnter) {
            handleChange(dateOnPressEnter);
          }
        }}
        className={clsx(s.datePickerInput, !isValidInputValue && s.datePickerInputInvalid)}
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
            inputValueDate={value}
            onChange={handleChange}
            selectedValue={currentDate}
            setShowPopup={setShowPopup}
          />
        </div>
      )}
    </div>
  );
};
