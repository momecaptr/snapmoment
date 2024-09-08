import { MutableRefObject, useEffect, useRef } from 'react';

interface IObserverOptions {
  root: HTMLElement | null;
  rootMargin: string;
  threshold: number;
}

type PropsOptions = Omit<IObserverOptions, 'root'>;

export interface IUseObserverInfiniteScroll extends Partial<PropsOptions> {
  callBack?: () => void;
  triggerRef: MutableRefObject<HTMLDivElement>;
  wrapperRef?: MutableRefObject<HTMLDivElement>;
}

export const useObserverInfiniteScroll = (props: IUseObserverInfiniteScroll) => {
  const { callBack, rootMargin = '100px 0px', threshold = 1.0, triggerRef, wrapperRef } = props;
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const wrapperElement = wrapperRef ? wrapperRef.current : null; // null === Используем viewport в качестве корневого элемента
    const triggerElement = triggerRef.current;

    if (callBack) {
      const options: IObserverOptions = {
        root: wrapperElement, // Корневой элемент
        rootMargin: rootMargin, // Отступы к корневому элементу
        threshold: threshold // 0.5 === Callback будет вызван, когда элемент на 50% виден в viewport
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
