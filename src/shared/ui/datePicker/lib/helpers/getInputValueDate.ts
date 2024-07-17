import { RangeDate } from '@/shared/ui';
import { getInputValueFromDate } from '@/shared/ui/datePicker/lib/utils';

export const getInputValueDate = (value: RangeDate): string => {
  return `${getInputValueFromDate(value.startDate)} - ${getInputValueFromDate(value.endDate)}`;
};
