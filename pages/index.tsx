import React, { useEffect } from 'react';

import { wrapper } from '@/myApp/store';
import { PublicPage } from '@/pagesComponents';
import { getPostLikes } from '@/shared/api/posts/postsApi';
import { getPostById, getPostCommentsByPostId, getPublicPosts } from '@/shared/api/public/publicApi';
import { ModalKey, useModal } from '@/shared/lib';
import { getConditionLayout } from '@/shared/providers';
import { PostModal } from '@/widget';
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

export default function Home({
  postComments,
  postData,
  postLikes,
  posts
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);

  useEffect(() => {
    if (router.query.id) {
      setOpen(true);
    }
  }, [router.query.id]);

  const showPostModalHandler = (postId: number) => {
    setOpen(true);
    router.push(`/?id=${postId}`);
  };

  return getConditionLayout(
    <>
      {isOpen && <PostModal postComments={postComments} postData={postData} postLikes={postLikes} />}
      <PublicPage posts={posts} showPostModalHandler={showPostModalHandler} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const postId = Number(context.query.id);

    const posts = await store.dispatch(
      getPublicPosts.initiate({
        pageSize: 4,
        sortBy: 'createdAt',
        sortDirection: 'desc'
      })
    );

    let postData = null;
    let postComments = null;
    let postLikes = null;

    try {
      if (postId) {
        const [postPromise, postCommentsPromise, postLikesPromise] = await Promise.all([
          store.dispatch(getPostById.initiate({ postId })),
          store.dispatch(getPostCommentsByPostId.initiate({ postId })),
          store.dispatch(getPostLikes.initiate({ postId }))
        ]);

        postData = postPromise.data || null;
        postComments = postCommentsPromise.data || null;
        postLikes = postLikesPromise.data || null;
      }

      return {
        props: {
          postComments,
          postData,
          postLikes,
          posts: posts?.data?.items
        }
      };
    } catch (error) {
      console.error('Abort fetching post data:', error);

      return {
        props: {
          postComments: null,
          postData: null,
          postLikes: null,
          posts: []
        }
      };
    }
  }
);
