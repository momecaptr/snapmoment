import { RangeDate, getInputValueFromDate } from '@/shared/ui';

export const getInputValueDate = (value: RangeDate): string => {
  return `${getInputValueFromDate(value.startDate)} - ${getInputValueFromDate(value.endDate)}`;
};
