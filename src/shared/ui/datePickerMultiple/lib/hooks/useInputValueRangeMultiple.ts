import React, { useLayoutEffect, useMemo, useState } from 'react';

import {
  getDateFromInputValueMultiple,
  getInputValueDateMultiple,
  isInRangeMultiple
} from '@/shared/ui/datePickerMultiple/lib';
import { RangeDateMultiple } from '@/shared/ui/datePickerMultiple/ui/DatePickerMultiple';

interface Props {
  max?: Date;
  min?: Date;
  value: RangeDateMultiple;
}

export const useInputValueRangeMultiple = ({ max, min, value }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  useLayoutEffect(() => {
    setInputValue(getInputValueDateMultiple(value));
  }, [value, setInputValue]);

  const [inputValueDate, isValidInputValue] = useMemo(() => {
    const date = getDateFromInputValueMultiple(inputValue);

    if (!date) {
      return [undefined, false];
    }

    const isDateInRange = isInRangeMultiple(date.startDate, min, max) && isInRangeMultiple(date.endDate, min, max);

    return [date, isDateInRange];
  }, [inputValue, min, max]);

  return {
    inputValue,
    inputValueDate,
    isValidInputValue,
    onInputValueChange,
    setInputValue
  };
};
