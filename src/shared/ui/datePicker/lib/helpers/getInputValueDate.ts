import { getInputValueFromDate } from '@/shared/ui/datePicker/lib/utils';
import { RangeDate } from '@/shared/ui/datePicker/ui/DatePicker';

export const getInputValueDate = (value: RangeDate): string => {
  return `${getInputValueFromDate(value.startDate)} - ${getInputValueFromDate(value.endDate)}`;
};
