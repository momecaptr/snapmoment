import { useEffect, useState } from 'react';

import { useGetPublicPostsQuery } from '@/shared/api/public/publicApi';

export interface IUseInfiniteScroll {
  newElementsPerRequestCount: number;
  startElementsCount: number;
}

export const useInfiniteScroll = (props: IUseInfiniteScroll) => {
  const { newElementsPerRequestCount, startElementsCount } = props;
  const [currentElementsCount, setCurrentElementsCount] = useState(startElementsCount);
  const { isFetching, refetch } = useGetPublicPostsQuery({ pageSize: currentElementsCount }); //todo: вынести из хука

  useEffect(() => {
    const handleScroll = () => {
      if (typeof document !== 'undefined') {
        const TOTAL_PAGE_HEIGHT = document.documentElement.scrollHeight;
        const CURRENT_DISTANCE_FROM_TOP = document.documentElement.scrollTop;
        const VISIBLE_REGION = window.innerHeight;
        const DISTANCE_TO_BOTTOM = 100;

        // Если пользователь проскроллит страницу до конца и еще не получил все посты, то добавляем новые посты:
        if (!isFetching && TOTAL_PAGE_HEIGHT - (VISIBLE_REGION + CURRENT_DISTANCE_FROM_TOP) < DISTANCE_TO_BOTTOM) {
          setCurrentElementsCount((prevState) => prevState + newElementsPerRequestCount);
          refetch();
        }
      }
    };

    // Проверка чтобы убедиться, что document доступен перед его использованием.
    // Это предотвратит ошибку на сервере при рендеринге на стороне сервера.
    if (typeof document !== 'undefined') {
      document.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isFetching, newElementsPerRequestCount, refetch]);

  return { currentElementsCount, isPostsFetching: isFetching };
};
