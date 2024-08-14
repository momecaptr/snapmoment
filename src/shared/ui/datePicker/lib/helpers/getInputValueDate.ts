import { getInputValueFromDate } from '../../lib/utils';

export const getInputValueDate = (value: Date): string => {
  return `${getInputValueFromDate(value)}`;
};
