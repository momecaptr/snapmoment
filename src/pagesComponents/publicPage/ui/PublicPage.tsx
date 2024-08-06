import * as React from 'react';

import { RegisteredUsersCounter } from '@/entities';
import {
  Item,
  useLazyGetPostByIdQuery,
  useLazyGetPostCommentsByPostIdQuery,
  useLazyGetPostLikesQuery,
  useMeQuery
} from '@/shared/api';
import { ModalKey, useModal } from '@/shared/lib';
import { UserCard } from '@/widget';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import s from './PublicPage.module.scss';

import { getStaticProps } from '../../../../pages';

export const PublicPage = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <section className={s.container}>
        <RegisteredUsersCounter />

        <PostList posts={posts} />
      </section>
    </>
  );
};

const PostList = ({ posts }: { posts: Item[] }) => {
  return (
    <div className={s.cards}>
      {posts?.map((post) => (
        <Link href={`/public/posts/${post.id}`} key={post.id}>
          <PublicPost1 post={post} />
        </Link>
      ))}
    </div>
  );
};

export const PublicPost1 = ({ post }: { post: Item }) => {
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);

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

  const { data: me } = useMeQuery();

  const isDataFetching = isFetching && isFetchingPostComments && isFetchingPostLikes;

  return (
    <>
      <UserCard lazyOpenModalHandler={lazyOpenModalHandler} post={post} />
    </>
  );
};
