import { useCallback, useLayoutEffect, useMemo, useState } from 'react';

import { getDateFromInputValue, getInputValueDate, isInRange } from '@/shared/ui';

interface Props {
  value: Date;
}

export const useInputValueRange = ({ value }: Props) => {
  const [inputValue, setInputValue] = useState('');

  const onInputValueChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.trim());
  }, []);

  useLayoutEffect(() => {
    setInputValue(getInputValueDate(value));
  }, [value]);

  const memoizedResult = useMemo(() => {
    const date = getDateFromInputValue(inputValue);

    if (!date) {
      return { date: undefined, isValid: false };
    }

    const isDateInRange = isInRange(date);

    return { date, isValid: isDateInRange };
  }, [inputValue]);

  const { date: inputValueDate, isValid: isValidInputValue } = memoizedResult;

  return {
    inputValue,
    inputValueDate,
    isValidInputValue,
    onInputValueChange,
    setInputValue
  };
};
