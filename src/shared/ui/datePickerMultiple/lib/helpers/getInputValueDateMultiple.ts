import { RangeDateMultiple } from '../../ui/DatePickerMultiple';
import { getInputValueFromDateMultiple } from '../utils';

export const getInputValueDateMultiple = (value: RangeDateMultiple): string => {
  return `${getInputValueFromDateMultiple(value.startDate)} - ${getInputValueFromDateMultiple(value.endDate)}`;
};
