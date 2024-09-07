import React from 'react';

import Page from '@/../pages/public/posts';
import { wrapper } from '@/myApp/store';
import { getRunningQueriesThunk } from '@/shared/api/common/snapmomentAPI';
import { getPublicPosts } from '@/shared/api/public/publicApi';
import { Item } from '@/shared/api/public/publicTypes';
import { getConditionLayout } from '@/shared/providers';
import { GetStaticPropsResult, InferGetStaticPropsType } from 'next';

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return getConditionLayout(<Page posts={posts} />);
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
