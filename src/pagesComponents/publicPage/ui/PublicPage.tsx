import * as React from 'react';

import { RegisteredUsersCounter } from '@/entities';
import { useInfiniteScroll } from '@/pagesComponents/publicPage/lib/hooks/useInfiniteScroll';
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
  const startPostsCount = 5;
  const newPostsPerRequestCount = 5;

  const { currentElementsCount: currentPostsCount } = useInfiniteScroll(startPostsCount, newPostsPerRequestCount);
  const { data: publicPosts } = useGetPublicPostsQuery({ pageSize: currentPostsCount });

  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);
  const { data: me } = useMeQuery();
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
