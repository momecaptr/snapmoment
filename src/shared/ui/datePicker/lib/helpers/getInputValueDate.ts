import { getInputValueFromDate } from '@/shared/ui';

export const getInputValueDate = (value: Date): string => {
  return `${getInputValueFromDate(value)}`;
};
