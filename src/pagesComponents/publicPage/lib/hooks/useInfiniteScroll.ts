import { useEffect } from 'react';

export interface IUseInfiniteScroll {
  callBack?: () => void;
  distanceToBottom?: number;
}

export const useInfiniteScroll = (props: IUseInfiniteScroll) => {
  const { callBack, distanceToBottom = 100 } = props;

  useEffect(() => {
    const handleScroll = () => {
      const TOTAL_PAGE_HEIGHT = document.documentElement.scrollHeight;
      const CURRENT_DISTANCE_FROM_TOP = document.documentElement.scrollTop;
      const VISIBLE_REGION = window.innerHeight;

      if (TOTAL_PAGE_HEIGHT - (VISIBLE_REGION + CURRENT_DISTANCE_FROM_TOP) < distanceToBottom) {
        callBack?.();
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [callBack, distanceToBottom]);
};
