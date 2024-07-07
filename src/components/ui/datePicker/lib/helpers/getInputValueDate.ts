import { RangeDate } from '@/components/ui/datePicker/DatePicker';
import { getInputValueFromDate } from '@/components/ui/datePicker/lib/utils';

export const getInputValueDate = (value: RangeDate): string => {
  return `${getInputValueFromDate(value.startDate)} - ${getInputValueFromDate(value.endDate)}`;
};
