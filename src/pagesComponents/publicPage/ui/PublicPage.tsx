import * as React from 'react';

import { RegisteredUsersCounter } from '@/entities';
import { IUseInfiniteScroll, useInfiniteScroll } from '@/pagesComponents/publicPage/lib/hooks/useInfiniteScroll';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { useLazyGetPostLikesQuery } from '@/shared/api/posts/postsApi';
import {
  useGetPublicPostsQuery,
  useLazyGetPostByIdQuery,
  useLazyGetPostCommentsByPostIdQuery
} from '@/shared/api/public/publicApi';
import { ModalKey, useModal } from '@/shared/lib';
import { UserCard } from '@/widget';
import { ViewPostModal } from '@/widget/modals/viewPostModal/ViewPostModal';

import s from './PublicPage.module.scss';

//todo: добавить тернарник для значений в зависимости от размера экрана.
const START_POSTS_COUNT = 8;
const NEW_POSTS_PER_REQUEST_COUNT = 4;

export const PublicPage = () => {
  //получаем метод refetch и флаг isFetching для использования в useInfiniteScroll из useGetPublicPostsQuery
  const { isFetching: isFetchingPosts, refetch: reFetchPosts } = useGetPublicPostsQuery({});

  const { currentElementsCount: currentPostsCount } = useInfiniteScroll({
    callBack: reFetchPosts,
    isFetching: isFetchingPosts,
    newElementsPerRequestCount: NEW_POSTS_PER_REQUEST_COUNT,
    startElementsCount: START_POSTS_COUNT
  } as IUseInfiniteScroll);

  //послыаем запрос на получение постов в useGetPublicPostsQuery
  const { data: publicPosts } = useGetPublicPostsQuery({ pageSize: currentPostsCount });

  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);
  const { data: me } = useMeQuery();
  const [getPostById, { data: postData, isFetching: isFetchingPostData }] = useLazyGetPostByIdQuery();
  const [getPostCommentsByPostId, { data: postComments, isFetching: isFetchingPostComments }] =
    useLazyGetPostCommentsByPostIdQuery();
  const [getPostLikes, { data: postLikes, isFetching: isFetchingPostLikes }] = useLazyGetPostLikesQuery();

  const lazyOpenModalHandler = async (postId: number, isOpen: boolean) => {
    setOpen(isOpen);
    getPostById({ postId: postId });
    getPostCommentsByPostId({ postId: postId });
    getPostLikes({ postId: postId });
  };
  const isDataFetching = isFetchingPostData && isFetchingPostComments && isFetchingPostLikes;

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
