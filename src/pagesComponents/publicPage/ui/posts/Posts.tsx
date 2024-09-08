import React, { MutableRefObject, useCallback, useRef, useState } from 'react';

//import { IUseInfiniteScroll, useInfiniteScroll } from '@/pagesComponents/publicPage/lib/hooks/useInfiniteScroll';
import {
  IUseObserverInfiniteScroll,
  useObserverInfiniteScroll
} from '@/pagesComponents/publicPage/lib/hooks/useObserverInfiniteScroll';
import { useGetPublicPostsQuery } from '@/shared/api/public/publicApi';
import { UserCard } from '@/widget';

import s from '@/pagesComponents/publicPage/ui/PublicPage.module.scss';

type Props = {
  onOpenModal: (postId: number, isOpen: boolean) => Promise<void>;
};

//_todo: добавить тернарник этим константам, например, в зависимости от размеров экрана
const START_POSTS_COUNT = 10;
const NEXT_POSTS_COUNT = 10;

const Posts = (props: Props) => {
  const { onOpenModal } = props;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [postsCount, setPostCount] = useState(START_POSTS_COUNT);
  const { data: publicPosts, isFetching } = useGetPublicPostsQuery({
    pageSize: postsCount
  });

  //_todo: добавить useLazyGetPublicPostsQuery из RTK в onLoadNextPosts для подгрузки следующих постов
  const onLoadNextPosts = useCallback(() => {
    if (!isFetching) {
      setPostCount((prevState) => prevState + NEXT_POSTS_COUNT);
    }
  }, [isFetching]);

  //1
  //useInfiniteScroll({ callBack: onLoadNextPosts, distanceToBottom: 100 } as IUseInfiniteScroll);

  //2
  useObserverInfiniteScroll({ callBack: onLoadNextPosts, triggerRef } as IUseObserverInfiniteScroll);

  return (
    <div>
      <div className={s.cards}>
        {publicPosts?.items.map((post) => <UserCard key={post.id} lazyOpenModalHandler={onOpenModal} post={post} />)}
      </div>
      <div ref={triggerRef}>Loading...</div>
    </div>
  );
};

export default Posts;
