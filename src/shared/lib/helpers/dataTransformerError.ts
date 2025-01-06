export interface IDataTransformerError<TError> {
  [p: string]: any;
  input: TError;

  message: string;
}

export class DataTransformerError<TError = any> extends Error {
  input?: TError;
  name = 'DataTransformerError';

  constructor(error?: Error | IDataTransformerError<TError> | string) {
    super(typeof error === 'string' ? error : error?.message);

    if (typeof error !== 'string' && !(error instanceof Error)) {
      this.input = error?.input;
    }
  }
}
