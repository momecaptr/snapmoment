import {
  getDateFromInputValueMultiple,
  getInputValueDateMultiple,
  isInRangeMultiple
} from '@/shared/ui/datePickerMultiple/lib';
import { RangeDateMultiple } from '@/shared/ui/datePickerMultiple/ui/DatePickerMultiple';

interface Props {
  inputValue: string;
  max?: Date;
  min?: Date;
  onChange: (value: RangeDateMultiple) => void;
  setInputValue: (value: string) => void;
  value: RangeDateMultiple;
}

export const updateValueOnPopupCloseActionMultiple = ({
  inputValue,
  max,
  min,
  onChange,
  setInputValue,
  value
}: Props) => {
  const date = getDateFromInputValueMultiple(inputValue);

  if (!date) {
    setInputValue(getInputValueDateMultiple(value));

    return;
  }

  const isDateInRange = isInRangeMultiple(date.startDate, min, max) && isInRangeMultiple(date.endDate, min, max);

  if (!isDateInRange) {
    return;
  }

  onChange({ ...date });
};
