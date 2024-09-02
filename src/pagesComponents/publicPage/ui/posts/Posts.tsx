import React, { useCallback, useState } from 'react';

import { useInfiniteScroll } from '@/pagesComponents/publicPage/lib/hooks/useInfiniteScroll';
import { useGetPublicPostsQuery } from '@/shared/api/public/publicApi';
import { UserCard } from '@/widget';

import s from '@/pagesComponents/publicPage/ui/PublicPage.module.scss';

type Props = {
  onOpenModal: (postId: number, isOpen: boolean) => Promise<void>;
};

const START_POSTS_COUNT = 10;
const NEXT_POSTS_COUNT = 10;

const Posts = (props: Props) => {
  const { onOpenModal } = props;
  //const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [postsCount, setPostCount] = useState(START_POSTS_COUNT);
  const {
    data: publicPosts,
    isFetching,
    refetch
  } = useGetPublicPostsQuery({
    pageSize: postsCount
  });

  const onLoadNextPosts = useCallback(() => {
    if (!isFetching) {
      setPostCount((prevState) => prevState + NEXT_POSTS_COUNT);
      refetch();
    }
  }, [isFetching, refetch]);

  //1
  useInfiniteScroll({ callBack: onLoadNextPosts });

  //2
  //useObserverInfiniteScroll({ callBack: onLoadNextPosts, triggerRef });

  return (
    <div>
      <div className={s.cards}>
        {publicPosts?.items.map((post) => <UserCard key={post.id} lazyOpenModalHandler={onOpenModal} post={post} />)}
      </div>
      {/*<div ref={triggerRef}>Loading...</div>*/}
    </div>
  );
};

export default Posts;
