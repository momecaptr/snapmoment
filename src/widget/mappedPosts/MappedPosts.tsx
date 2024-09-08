import React, { MutableRefObject, useCallback, useEffect, useRef } from 'react';

import { useLazyGetPublicPostsQuery } from '@/shared/api/public/publicApi';
import { IUseInfiniteScroll, useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { UserCard } from '@/widget';

import s from '@/pagesComponents/publicPage/ui/PublicPage.module.scss';

type Props = {
  onOpenModal: (postId: number, isOpen: boolean) => Promise<void>;
};

//todo: добавить тернарник этим константам, например, в зависимости от размеров экрана
const START_POSTS_COUNT = 10;
const NEXT_POSTS_COUNT = 10;

export const MappedPosts = (props: Props) => {
  const { onOpenModal } = props;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const [getPublicPosts, { data: publicPosts, isFetching }] = useLazyGetPublicPostsQuery();

  useEffect(() => {
    getPublicPosts({ pageSize: START_POSTS_COUNT });
  }, []);

  const onLoadNextPosts = useCallback(() => {
    if (!isFetching) {
      getPublicPosts({ pageSize: publicPosts ? publicPosts.items.length + NEXT_POSTS_COUNT : 0 });
    }
  }, [isFetching]);

  useInfiniteScroll({
    callBack: onLoadNextPosts,
    rootMargin: '100px 0px',
    triggerRef
  } as IUseInfiniteScroll);

  //todo: добавить <Loading/> в <div ref={triggerRef}></div>
  return (
    <div>
      <div className={s.cards}>
        {publicPosts?.items.map((post) => <UserCard key={post.id} lazyOpenModalHandler={onOpenModal} post={post} />)}
      </div>
      <div ref={triggerRef}></div>
    </div>
  );
};
