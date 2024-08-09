import React, { useLayoutEffect, useMemo, useState } from 'react';

import { getDateFromInputValueMultiple, isInRangeMultiple } from '../../lib/utils';
import { RangeDateMultiple } from '../../ui/DatePickerMultiple';
import { getInputValueDateMultiple } from '../helpers/getInputValueDateMultiple';

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
