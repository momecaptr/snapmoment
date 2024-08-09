import * as React from 'react';

import { RegisteredUsersCounter } from '@/entities';
import { ModalKey, useModal } from '@/shared/lib';
import { UserCard, ViewPostModal } from '@/widget';
// import { UserCard } from '@/widget';
// import { ViewPostModal } from '@/widgetviewPostModal/ViewPostModal';

import { useMeQuery } from '@/shared/api/auth/authApi';
import { useLazyGetPostLikesQuery } from '@/shared/api/posts/postsApi';
import {
  useGetPublicPostsQuery,
  useLazyGetPostByIdQuery,
  useLazyGetPostCommentsByPostIdQuery
} from '@/shared/api/public/publicApi';

import s from './PublicPage.module.scss';

export const PublicPage = () => {
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);

  const { data: me } = useMeQuery();
  const { data: publicPosts } = useGetPublicPostsQuery({ pageSize: 4 });
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
