import { getDateFromInputValue, isInRange } from '../utils';
import { getInputValueDate } from './getInputValueDate';

interface Props {
  inputValue: string;
  max?: Date;
  min?: Date;
  onChange: (value: Date) => void;
  setInputValue: (value: string) => void;
  value: Date;
}

export const updateValueOnPopupCloseAction = ({ inputValue, max, min, onChange, setInputValue, value }: Props) => {
  const date = getDateFromInputValue(inputValue);

  if (!date) {
    setInputValue(getInputValueDate(value));

    return;
  }

  const isDateInRange = isInRange(date, min, max);

  if (!isDateInRange) {
    return;
  }

  onChange({ ...date });
};
