'use client';
import React from 'react';

import CalendarOutline from '@/common/assets/components/CalendarOutline';
import { DatePickerPopupContent } from '@/components/ui/datePicker/DatePickerPopupContent';
import { updateValueOnPopupCloseAction } from '@/components/ui/datePicker/lib/helpers/updateValueOnPopupCloseAction';
import { useInputValueRange } from '@/components/ui/datePicker/lib/hooks/useInputValueRange';
import { useShowPopup } from '@/components/ui/datePicker/lib/hooks/useShowPopup';
import { clsx } from 'clsx';

import './DatePicker.scss';

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
    value,
  });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }

    updateValueOnPopupCloseAction({ inputValue, max, min, onChange, setInputValue, value });
  };

  return (
    <div className={`DatePicker ${showPopup && 'showPopup'}`} ref={elementRef}>
      <input
        className={clsx('DatePicker__input', !isValidInputValue && 'DatePicker__input--invalid')}
        onChange={onInputValueChange}
        onClick={handleInputClick}
        onKeyDown={onKeyDown}
        type={'text'}
        value={inputValue}
      />
      <CalendarOutline />

      {showPopup && (
        <div className={'DatePicker__popup'}>
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
