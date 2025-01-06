import { isNull } from './isNull';
import { isUndefined } from './isUndefined';

export function isValid<T>(value: T | null | undefined): value is T {
  return !isNull(value) && !isUndefined(value);
}
