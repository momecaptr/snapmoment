import React from 'react';

import CalendarOutline from '@/../public/assets/components/CalendarOutline';
import {
  updateValueOnPopupCloseActionMultiple,
  useInputValueRangeMultiple,
  useShowPopupMultiple
} from '@/shared/ui/datePickerMultiple/lib';
import { DatePickerMultiplePopupContent } from '@/shared/ui/datePickerMultiple/ui/DatePickerMultiplePopupContent';
import { clsx } from 'clsx';

import s from './DatePickerMultiple.module.scss';

export type RangeDateMultiple = {
  endDate: Date;
  startDate: Date;
};

export interface DatePickerMultipleProps {
  max?: Date;
  min?: Date;
  onChange: (value: RangeDateMultiple) => void;
  value: RangeDateMultiple;
}

export const DatePickerMultiple = ({ max, min, onChange, value }: DatePickerMultipleProps) => {
  const { elementRef, handleInputClick, setShowPopup, showPopup } = useShowPopupMultiple();

  const handleChange = (value: RangeDateMultiple) => {
    onChange({ ...value });
  };

  const { inputValue, inputValueDate, isValidInputValue, onInputValueChange, setInputValue } =
    useInputValueRangeMultiple({
      max,
      min,
      value
    });

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') {
      return;
    }

    updateValueOnPopupCloseActionMultiple({ inputValue, max, min, onChange, setInputValue, value });
  };

  if (!isValidInputValue && showPopup) {
    setShowPopup(false);
  }

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
      <CalendarOutline color={isValidInputValue ? '' : 'var(--danger-100)'} />

      {showPopup && (
        <div className={s.datePickerPopup}>
          <DatePickerMultiplePopupContent
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
