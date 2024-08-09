import * as React from 'react';
import { useEffect, useState } from 'react';

import { RegisteredUsersCounter } from '@/entities';
import {
  useGetPublicPostsQuery,
  useLazyGetPostByIdQuery,
  useLazyGetPostCommentsByPostIdQuery,
  useLazyGetPostLikesQuery,
  useMeQuery
} from '@/shared/api';
import { ModalKey, useModal } from '@/shared/lib';
import { UserCard } from '@/widget';
import { ViewPostModal } from '@/widget/modals/viewPostModal/ViewPostModal';

import s from './PublicPage.module.scss';

export const PublicPage = () => {
  const startPostsCount = 10;
  const newPostsPerRequestCount = 10;
  const [currentPostsCount, setCurrentPostsCount] = useState(startPostsCount);
  const [isPostsFetching, setIsPostsFetching] = useState(false);

  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);
  const { data: me } = useMeQuery();
  const { data: publicPosts } = useGetPublicPostsQuery({ pageSize: currentPostsCount });
  const [getPostById, { data: postData, isFetching }] = useLazyGetPostByIdQuery();
  const [getPostCommentsByPostId, { data: postComments, isFetching: isFetchingPostComments }] =
    useLazyGetPostCommentsByPostIdQuery();
  const [getPostLikes, { data: postLikes, isFetching: isFetchingPostLikes }] = useLazyGetPostLikesQuery();

  const lazyOpenModalHandler = async (postId: number, isOpen: boolean) => {
    setOpen(isOpen);
    getPostById({ postId: postId });
    getPostCommentsByPostId({ postId: postId });
    getPostLikes({ postId: postId });
  };
  const isDataFetching = isFetching && isFetchingPostComments && isFetchingPostLikes;

  useEffect(() => {
    if (isPostsFetching) {
      setCurrentPostsCount((prevState) => prevState + newPostsPerRequestCount);
    }
    setIsPostsFetching(false);
  }, [isPostsFetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    const totalPageHeight = document.documentElement.scrollHeight;
    const currentDistanceFromTop = document.documentElement.scrollTop;
    const visibleRegion = window.innerHeight;
    const distanceToBottom = 100;

    if (totalPageHeight - (visibleRegion + currentDistanceFromTop) < distanceToBottom) {
      console.log('scroll coming to bottom');
      setIsPostsFetching(true);
    }
  };

  return (
    <>
      <ViewPostModal
        isAuth={!!me?.userId}
        isFetching={isDataFetching}
        openViewPhoto={isOpen}
        postComments={postComments}
        postData={postData}
        postLikes={postLikes}
        setOpenViewPhoto={setOpen}
      />

      <section className={s.container}>
        <RegisteredUsersCounter />

        <div className={s.cards}>
          {publicPosts?.items.map((post) => (
            <UserCard key={post.id} lazyOpenModalHandler={lazyOpenModalHandler} post={post} />
          ))}
        </div>
      </section>
    </>
  );
};
