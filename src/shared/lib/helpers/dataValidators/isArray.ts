import { getType } from './getType';

export function isArray<T>(value: any): value is T[] {
  return getType(value) === '[object Array]';
}

export default isArray;
