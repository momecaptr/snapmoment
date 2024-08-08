import { getInputValueFromDate } from '@/shared/ui/datePicker/lib';

export const getInputValueDate = (value: Date): string => {
  return `${getInputValueFromDate(value)}`;
};
