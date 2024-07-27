import React from 'react';

import { Posts } from '@/pagesComponents/posts/Posts';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function Home() {
  // return <GeneralInfo />;
  return <Posts />;
}

// Home.getLayout = getLayout;
export default Home;
