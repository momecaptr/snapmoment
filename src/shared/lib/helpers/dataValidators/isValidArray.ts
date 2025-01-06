import { isArray } from './isArray';

function isValidArray<T>(value: any): value is T[];
// eslint-disable-next-line no-redeclare
function isValidArray<T>(value: T[]): value is T[];
// eslint-disable-next-line no-redeclare
function isValidArray(value: any) {
  return isArray(value) && value.length > 0;
}

export { isValidArray };
