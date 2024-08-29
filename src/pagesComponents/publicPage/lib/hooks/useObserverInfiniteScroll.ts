import { MutableRefObject, useEffect, useRef } from 'react';

export interface IUseObserverInfiniteScroll {
  callBack: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef: MutableRefObject<HTMLElement>;
}

export const useObserverInfiniteScroll = (props: IUseObserverInfiniteScroll) => {
  const { callBack, triggerRef } = props;
  const ref = useRef<IntersectionObserver | null>();

  useEffect(() => {}, []);

  return {};
};
