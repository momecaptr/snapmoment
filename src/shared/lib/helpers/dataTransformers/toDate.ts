import { DataTransformerError } from '../dataTransformerError';
import { isDate, isUndefined } from '../dataValidators';

export function toDate<T extends Date, U = any>(input: any, defaultValue?: U): T | U {
  const date = new Date(input);

  if (isDate<T>(date)) {
    return date;
  }

  if (isUndefined(defaultValue)) {
    throw new DataTransformerError({
      input,
      message: 'Failed to cast value to Date'
    });
  }

  return defaultValue;
}
