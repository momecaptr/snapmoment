import { getType } from './getType';
import { isValidNumber } from './isValidNumber';

export function isDate<T extends Date>(value: any): value is T {
  return getType(value) === '[object Date]' && isValidNumber(value.getTime());
}
