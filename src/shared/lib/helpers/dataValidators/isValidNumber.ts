import { isNaN } from './isNan';

export function isValidNumber<T extends number>(value: T) {
  return !isNaN(value);
}
