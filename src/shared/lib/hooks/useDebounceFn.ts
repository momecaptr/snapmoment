import { useCallback, useRef } from 'react';

export function useDebounceFn(callback: () => void, delay: number) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback();
      timerRef.current = null;
    }, delay);
  }, [callback, delay]);

  return debouncedFunction;
}
