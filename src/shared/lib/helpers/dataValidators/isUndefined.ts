import { getType } from './getType';

export function isUndefined(value: unknown): value is undefined {
  return getType(value) === '[object Undefined]';
}
