import { MutableRefObject, useEffect, useRef } from 'react';

export interface IUseInfiniteScrollAlt {
  callBack: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
}

export const useInfiniteScrollAlt = (props: IUseInfiniteScrollAlt) => {
  const { callBack, triggerRef } = props;
  const ref = useRef<IntersectionObserver | null>();

  useEffect(() => {}, []);

  return {};
};
