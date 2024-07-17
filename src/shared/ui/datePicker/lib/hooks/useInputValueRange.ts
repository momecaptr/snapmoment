'use client';
import React, { useLayoutEffect, useMemo, useState } from 'react';

import { RangeDate, getDateFromInputValue, getInputValueDate, isInRange } from '@/shared/ui';

interface Props {
  max?: Date;
  min?: Date;
  value: RangeDate;
}

export const useInputValueRange = ({ max, min, value }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const onInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  };

  useLayoutEffect(() => {
    setInputValue(getInputValueDate(value));
  }, [value, setInputValue]);

  const [inputValueDate, isValidInputValue] = useMemo(() => {
    const date = getDateFromInputValue(inputValue);

    if (!date) {
      return [undefined, false];
    }

    const isDateInRange = isInRange(date.startDate, min, max) && isInRange(date.endDate, min, max);

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
