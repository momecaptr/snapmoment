import React from 'react';

import CalendarOutline from '@/../public/assets/components/CalendarOutline';
import { updateValueOnPopupCloseAction, useInputValueRange, useShowPopup } from '@/shared/ui/datePicker/lib';
import { DatePickerPopupContent } from '@/shared/ui/datePicker/ui/DatePickerPopupContent';
import { clsx } from 'clsx';

import s from './DatePicker.module.scss';

export interface DatePickerProps {
  name?: string;
  onChange: (value: Date) => void;
  value: Date;
}

export const DatePicker = ({ name, onChange, value }: DatePickerProps) => {
  const { elementRef, handleInputClick, setShowPopup, showPopup } = useShowPopup();

  const handleChange = (value: Date) => {
    onChange(value);
  };

  const { inputValue, inputValueDate, isValidInputValue, onInputValueChange, setInputValue } = useInputValueRange({
    value
  });

  // console.log('isValidInputValue', isValidInputValue);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }

    updateValueOnPopupCloseAction({ inputValue, onChange, setInputValue, value });
  };

  if (!isValidInputValue && showPopup) {
    setShowPopup(false);
  }

  return (
    <div className={clsx(s.datePicker, showPopup && s.showPopup)} ref={elementRef}>
      <input
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
            inputValueDate={inputValueDate}
            onChange={handleChange}
            selectedValue={value}
            setShowPopup={setShowPopup}
          />
        </div>
      )}
    </div>
  );
};
