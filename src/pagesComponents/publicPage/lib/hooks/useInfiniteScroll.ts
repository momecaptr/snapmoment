import { useEffect, useState } from 'react';

import { useGetPublicPostsQuery } from '@/shared/api';

export const useInfiniteScroll = (startElementsCount: number, newElementsPerRequestCount: number) => {
  const [currentElementsCount, setCurrentElementsCount] = useState(startElementsCount);
  const { isFetching, refetch } = useGetPublicPostsQuery({ pageSize: currentElementsCount });

  useEffect(() => {
    const handleScroll = () => {
      const totalPageHeight = document.documentElement.scrollHeight;
      const currentDistanceFromTop = document.documentElement.scrollTop;
      const visibleRegion = window.innerHeight;
      const distanceToBottom = 100;

      if (!isFetching && totalPageHeight - (visibleRegion + currentDistanceFromTop) < distanceToBottom) {
        setCurrentElementsCount((prevState) => prevState + newElementsPerRequestCount);
        refetch();
      }
    };

    document.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [isFetching, newElementsPerRequestCount, refetch]);

  return { currentElementsCount, isPostsFetching: isFetching };
};
