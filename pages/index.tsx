import React from 'react';

import { PublicPage } from '@/pagesComponents';
import { Posts } from '@/pagesComponents/posts/Posts';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { getAuthLayout, getBaseLayout } from '@/shared/providers';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // return <GeneralInfo />;
  const { data } = useMeQuery();

  if (data) {
    // ! Тут PrivatePosts, потому что авторизованы
    return getBaseLayout(<PublicPage />);
  } else {
    // ! Тут вместо обычных постов должны быть PublicPosts
    return getAuthLayout(<Posts />);
  }
}

// Home.getLayout = function getLayout(page: React.ReactNode) {
//   return <BaseLayout>{page}</BaseLayout>;
// };
