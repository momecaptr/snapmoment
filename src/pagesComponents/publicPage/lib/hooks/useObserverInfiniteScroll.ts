import { MutableRefObject, useEffect, useRef } from 'react';

export interface IUseObserverInfiniteScroll {
  callBack?: () => void;
  triggerRef: MutableRefObject<HTMLDivElement>;
  wrapperRef?: MutableRefObject<HTMLDivElement>;
}

export const useObserverInfiniteScroll = (props: IUseObserverInfiniteScroll) => {
  const { callBack, triggerRef, wrapperRef } = props;
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const wrapperElement = wrapperRef ? wrapperRef.current : null; // null === Используем viewport в качестве корневого элемента
    const triggerElement = triggerRef.current;

    if (callBack) {
      const options = {
        root: wrapperElement,
        rootMargin: '300px 0px', // Можно добавить отступы к корневому элементу
        threshold: 1.0 //0.5 === Callback будет вызван, когда элемент на 50% виден в viewport
      };

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callBack();
        }
      }, options);

      observer.current.observe(triggerElement);
    }

    return () => {
      if (observer.current && triggerElement) {
        observer.current.unobserve(triggerElement);
      }
    };
  }, [callBack, triggerRef, wrapperRef]);

  return { triggerRef, wrapperRef };
};
