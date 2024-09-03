import React from 'react';

import Page from '@/../pages/public/posts';
import { wrapper } from '@/myApp/store';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { getRunningQueriesThunk } from '@/shared/api/common/snapmomentAPI';
import { getPublicPosts } from '@/shared/api/public/publicApi';
import { Item } from '@/shared/api/public/publicTypes';
import { getAuthLayout, getBaseLayout } from '@/shared/providers';
import { GetStaticPropsResult, InferGetStaticPropsType } from 'next';

// const inter = Inter({ subsets: ['latin'] });

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useMeQuery();

  if (data) {
    return getBaseLayout(<Page posts={posts} />);
  } else {
    return getAuthLayout(<Page posts={posts} />);
  }
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
