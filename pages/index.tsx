import React from 'react';

import { wrapper } from '@/myApp/store';
import { PublicPage } from '@/pagesComponents';
import { Posts } from '@/pagesComponents/posts/Posts';
import { Item, getPublicPosts, useMeQuery } from '@/shared/api';
import { getRunningQueriesThunk } from '@/shared/api/common/snapmomentAPI';
import { getAuthLayout, getBaseLayout } from '@/shared/providers';
import { GetStaticPropsResult, InferGetStaticPropsType } from 'next';

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

export const getStaticProps = wrapper.getStaticProps(
  (store) => async (): Promise<GetStaticPropsResult<{ posts: Item[] }>> => {
    const pageSize = 4;
    const sortBy = 'createdAt';
    const sortDirection = 'desc';

    const posts = await store.dispatch(
      getPublicPosts.initiate({
        pageSize,
        sortBy,
        sortDirection
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
