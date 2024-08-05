import React from 'react';

import { PublicPage } from '@/pagesComponents';
import { Posts } from '@/pagesComponents/posts/Posts';
import { GetPostsResponse, Item, useMeQuery } from '@/shared/api';
import { getAuthLayout, getBaseLayout } from '@/shared/providers';
import { GetStaticProps, InferGetStaticPropsType } from 'next';

// const inter = Inter({ subsets: ['latin'] });

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  // return <GeneralInfo />;
  const { data } = useMeQuery();

  if (data) {
    // ! Тут PrivatePosts, потому что авторизованы
    return getBaseLayout(<Posts />);
  } else {
    // ! Тут вместо обычных постов должны быть PublicPosts
    return getAuthLayout(<PublicPage posts={posts} />);
  }
}

// Home.getLayout = function getLayout(page: React.ReactNode) {
//   return <BaseLayout>{page}</BaseLayout>;
// };

export const getStaticProps: GetStaticProps<{ posts: Item[] }> = async () => {
  const pageSize = 4;
  const sortBy = 'createdAt';
  const sortDirection = 'desc';
  const url = new URL('https://inctagram.work/api/v1/public-posts/all');

  url.searchParams.append('pageSize', pageSize.toString());
  url.searchParams.append('sortBy', sortBy);
  url.searchParams.append('sortDirection', sortDirection);

  const res = await fetch(url.toString(), {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  });

  if (!res.ok) {
    console.error('Failed to fetch posts:', res.status, res.statusText);

    return { props: { posts: [] }, revalidate: 60 };
  }

  const data: GetPostsResponse = await res.json();

  return {
    props: {
      posts: data.items
    },
    revalidate: 60
  };
};
