import React from 'react';

import { authConfig } from '@/../configs/auth';
import { GeneralInfo } from '@/pagesComponents';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'] });

async function Home() {
  const session = await getServerSession(authConfig);

  console.log({ sessionIndex: session });

  return (
    <>
      <h1>Profile of {session?.user?.name}</h1>
      {session?.user?.email && <img alt={'сися'} src={session?.user?.image as string} />}
      <GeneralInfo />
    </>
  );
  // return <MyToast />;
  // return <SignUp />;
}

// Home.getLayout = getLayout;
export default Home;
