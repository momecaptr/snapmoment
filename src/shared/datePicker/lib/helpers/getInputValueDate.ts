import { getInputValueFromDate } from '@/shared/datePicker/lib/utils';
import { RangeDate } from '@/shared/datePicker/ui/DatePicker';

export const getInputValueDate = (value: RangeDate): string => {
  return `${getInputValueFromDate(value.startDate)} - ${getInputValueFromDate(value.endDate)}`;
};
