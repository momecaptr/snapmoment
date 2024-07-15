import { useId } from 'react';

export const useAutoId = (id?: string) => {
  const generatedId = useId();

  return id ?? generatedId;
};
