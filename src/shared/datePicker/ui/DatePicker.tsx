'use client';
import React from 'react';

import CalendarOutline from '@/../public/assets/components/CalendarOutline';
import { updateValueOnPopupCloseAction } from '@/shared/datePicker/lib/helpers/updateValueOnPopupCloseAction';
import { useInputValueRange } from '@/shared/datePicker/lib/hooks/useInputValueRange';
import { useShowPopup } from '@/shared/datePicker/lib/hooks/useShowPopup';
import { DatePickerPopupContent } from '@/shared/datePicker/ui/DatePickerPopupContent';
import { clsx } from 'clsx';

import s from './DatePicker.module.scss';

export type RangeDate = {
  endDate: Date;
  startDate: Date;
};

export interface DatePickerProps {
  max?: Date;
  min?: Date;
  onChange: (value: RangeDate) => void;
  value: RangeDate;
}

export const DatePicker = ({ max, min, onChange, value }: DatePickerProps) => {
  const { elementRef, handleInputClick, showPopup } = useShowPopup();

  const handleChange = (value: RangeDate) => {
    onChange({ ...value });
  };

  const { inputValue, inputValueDate, isValidInputValue, onInputValueChange, setInputValue } = useInputValueRange({
    max,
    min,
    value
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }

    updateValueOnPopupCloseAction({ inputValue, max, min, onChange, setInputValue, value });
  };

  return (
    <div className={clsx(s.datePicker, showPopup && s.showPopup)} ref={elementRef}>
      <input
        className={clsx(s.datePickerInput, !isValidInputValue && s.datePickerInputInvalid)}
        onChange={onInputValueChange}
        onClick={handleInputClick}
        onKeyDown={onKeyDown}
        type={'text'}
        value={inputValue}
      />
      <CalendarOutline />

      {showPopup && (
        <div className={s.datePickerPopup}>
          <DatePickerPopupContent
            inputValueDate={inputValueDate}
            max={max}
            min={min}
            onChange={handleChange}
            selectedValue={value.endDate}
          />
        </div>
      )}
    </div>
  );
};
