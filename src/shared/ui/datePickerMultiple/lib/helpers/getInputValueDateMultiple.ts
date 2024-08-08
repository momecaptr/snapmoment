import { getInputValueFromDateMultiple } from '@/shared/ui/datePickerMultiple/lib';
import { RangeDateMultiple } from '@/shared/ui/datePickerMultiple/ui/DatePickerMultiple';

export const getInputValueDateMultiple = (value: RangeDateMultiple): string => {
  return `${getInputValueFromDateMultiple(value.startDate)} - ${getInputValueFromDateMultiple(value.endDate)}`;
};
