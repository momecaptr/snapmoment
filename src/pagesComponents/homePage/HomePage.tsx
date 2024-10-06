import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { useLazyGetPublicPostsQuery } from '@/shared/api/public/publicApi';
import { IUseInfiniteScroll, useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { UserCard } from '@/widget';

import s from './HomePage.module.scss';

type Props = {
  showPostModalHandler: (isOpen: boolean, postId?: number) => void;
};

//todo: добавить тернарник этим константам, например, в зависимости от размеров экрана
const START_POSTS_COUNT = 10;
const NEXT_POSTS_COUNT = 10;

export const HomePage = (props: Props) => {
  const { showPostModalHandler } = props;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [getPublicPosts, { data: publicPosts, isFetching }] = useLazyGetPublicPostsQuery();

  // Запрашиваем первые посты при загрузке компонента
  useEffect(() => {
    getPublicPosts({ pageSize: START_POSTS_COUNT });
  }, []);

  //Проверяем есть ли еще посты на сервере
  const hasMorePosts = publicPosts?.totalCount === publicPosts?.items.length;

  const onLoadNextPosts = useCallback(() => {
    if (!isFetching && !hasMorePosts && publicPosts) {
      getPublicPosts({ pageSize: publicPosts.items.length + NEXT_POSTS_COUNT });
    }
  }, [isFetching]);

  useInfiniteScroll({
    callBack: onLoadNextPosts,
    rootMargin: '100px 0px',
    triggerRef
  } as IUseInfiniteScroll);

  //todo: добавить <Loading/> в <div ref={triggerRef}></div>
  return (
    <div className={s.container}>
      <div className={s.cards}>
        {publicPosts?.items.map((post) => (
          <UserCard key={post.id} post={post} showPostModalHandler={showPostModalHandler} />
        ))}
      </div>
      <div ref={triggerRef}></div>
    </div>
  );
};
