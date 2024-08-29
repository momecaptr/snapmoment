import { useEffect, useState } from 'react';

export interface IUseInfiniteScroll {
  callBack: () => void;
  isFetching: boolean;
  newElementsPerRequestCount: number;
  startElementsCount: number;
}

export const useInfiniteScroll = (props: IUseInfiniteScroll) => {
  const { callBack, isFetching, newElementsPerRequestCount, startElementsCount } = props;
  const [currentElementsCount, setCurrentElementsCount] = useState(startElementsCount);

  useEffect(() => {
    const TOTAL_PAGE_HEIGHT = document.documentElement.scrollHeight;
    const CURRENT_DISTANCE_FROM_TOP = document.documentElement.scrollTop;
    const VISIBLE_REGION = window.innerHeight;
    const DISTANCE_TO_BOTTOM = 100;

    const handleScroll = () => {
      if (!isFetching && TOTAL_PAGE_HEIGHT - (VISIBLE_REGION + CURRENT_DISTANCE_FROM_TOP) < DISTANCE_TO_BOTTOM) {
        setCurrentElementsCount((prevState) => prevState + newElementsPerRequestCount);
        callBack();
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, newElementsPerRequestCount, callBack]);

  return { currentElementsCount };
};
