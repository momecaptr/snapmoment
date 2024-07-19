'use client';
export const useThrottle = <F extends (...args: any[]) => void>(func: F, waitMilliseconds: number): F => {
  let lastCallTime: null | number = null;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const now = Date.now();

    if (lastCallTime === null || now - lastCallTime >= waitMilliseconds) {
      lastCallTime = now;
      func.apply(this, args);
    }
  } as F;
};
