import React from 'react';

import { ParsedUrlQuery } from 'node:querystring';

import { wrapper } from '@/myApp/store';
import { PublicPage } from '@/pagesComponents';
import { getPostLikes } from '@/shared/api/posts/postsApi';
import { getPostById, getPostCommentsByPostId } from '@/shared/api/public/publicApi';
import { Item } from '@/shared/api/public/publicTypes';
import { getConditionLayout } from '@/shared/providers';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, PreviewData } from 'next';

type Props = {
  posts: Item[];
};
export default function Page({
  postComments,
  postData,
  postLikes,
  posts
}: InferGetServerSidePropsType<typeof getServerSideProps> & Props) {
  return (
    <>
      <PublicPage postComments={postComments} postData={postData} postLikes={postLikes} posts={posts} />
    </>
  );
}
export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
    const postId = Number(context.query.id);

    let postData = null;
    let postComments = null;
    let postLikes = null;

    if (postId) {
      const postPromise = await store.dispatch(getPostById.initiate({ postId }));
      const postCommentsPromise = await store.dispatch(getPostCommentsByPostId.initiate({ postId }));
      const postLikesPromise = await store.dispatch(getPostLikes.initiate({ postId }));

      postData = postPromise.data || null;
      postComments = postCommentsPromise.data || null;
      postLikes = postLikesPromise.data || null;
    }

    return {
      props: {
        postComments,
        postData,
        postLikes
      }
    };
  }
);

Page.getLayout = getConditionLayout;
