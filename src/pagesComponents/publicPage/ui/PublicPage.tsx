import * as React from 'react';
import { useCallback } from 'react';

import { RegisteredUsersCounter } from '@/entities';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { useLazyGetPostLikesQuery } from '@/shared/api/posts/postsApi';
import { useLazyGetPostByIdQuery, useLazyGetPostCommentsByPostIdQuery } from '@/shared/api/public/publicApi';
import { ModalKey, useModal } from '@/shared/lib';
import { MappedPosts } from '@/widget';
import { ViewPostModal } from '@/widget/modals/viewPostModal/ViewPostModal';

import s from './PublicPage.module.scss';

export const PublicPage = () => {
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);
  const { data: me } = useMeQuery();
  const [getPostById, { data: postData, isFetching: isFetchingPostData }] = useLazyGetPostByIdQuery();
  const [getPostCommentsByPostId, { data: postComments, isFetching: isFetchingPostComments }] =
    useLazyGetPostCommentsByPostIdQuery();
  const [getPostLikes, { data: postLikes, isFetching: isFetchingPostLikes }] = useLazyGetPostLikesQuery();

  const lazyOpenModalHandler = useCallback(
    async (postId: number, isOpen: boolean) => {
      setOpen(isOpen);
      getPostById({ postId: postId });
      getPostCommentsByPostId({ postId: postId });
      getPostLikes({ postId: postId });
    },
    [getPostById, getPostCommentsByPostId, getPostLikes, setOpen]
  );
  const isDataFetching = isFetchingPostData && isFetchingPostComments && isFetchingPostLikes;

  return (
    <div>
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
        <MappedPosts onOpenModal={lazyOpenModalHandler} />
      </section>
    </div>
  );
};
