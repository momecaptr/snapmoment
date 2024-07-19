import React from 'react';

import { GeneralInfo } from '@/pagesComponents';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

function Home() {
  return <GeneralInfo />;
}

// Home.getLayout = getLayout;
export default Home;
