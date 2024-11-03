import React, { useEffect } from 'react';

import { wrapper } from '@/myApp/store';
import { PublicPage } from '@/pagesComponents';
import { HomePage } from '@/pagesComponents/homePage/HomePage';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { getRunningQueriesThunk } from '@/shared/api/common/snapmomentAPI';
import { getPublicPosts } from '@/shared/api/public/publicApi';
import { Item } from '@/shared/api/public/publicTypes';
import { ModalKey, useModal } from '@/shared/lib';
import { getConditionLayout } from '@/shared/providers';
import { PostModal } from '@/widget';
import { GetStaticPropsResult, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data: me } = useMeQuery();
  const router = useRouter();
  const { isOpen, setOpen } = useModal(ModalKey.ViewPhoto);
  const postId = Number(router.query.id);

  useEffect(() => {
    if (postId && !isOpen) {
      setOpen(true);
    }
  }, [postId]);

  const showPostModalHandler = (isOpen: boolean, postId?: number) => {
    setOpen(isOpen);
    postId && router.push(`/?id=${postId}`);
  };

  return getConditionLayout(
    <>
      {isOpen && <PostModal me={me} postId={postId} showPostModalHandler={showPostModalHandler} />}
      {!me && <PublicPage posts={posts} showPostModalHandler={showPostModalHandler} />}
      {me && <HomePage showPostModalHandler={showPostModalHandler} />}
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (): Promise<GetStaticPropsResult<{ posts: Item[] }>> => {
    const posts = await store.dispatch(
      getPublicPosts.initiate({
        pageSize: 4,
        sortBy: 'createdAt',
        sortDirection: 'desc'
      })
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    if (!posts || !posts.data) {
      return { props: { posts: [] }, revalidate: 60 };
    }

    return {
      props: {
        posts: posts.data.items
      },
      revalidate: 60
    };
  }
);
