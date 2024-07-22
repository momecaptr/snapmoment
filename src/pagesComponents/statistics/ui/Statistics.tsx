import React from 'react';

import { SwitchChartLike } from '@/features';
import { useGetPublicPostsQuery } from '@/myApp/api/inctagramApi';
import GoogleLoginButton from '@/pagesComponents/statistics/ui/GoogleLoginButton';
import { Button, Typography } from '@/shared/ui';

import s from './Statistics.module.scss';

export const Statistics = () => {
  const { data, isError, isLoading } = useGetPublicPostsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

  console.log(data);

  return (
    <div>
      <GoogleLoginButton />
      <Button onClick={() => window.location.assign('https://inctagram.work/api/v1/auth/github/login')}>
        reg github
      </Button>
      {/*{data?.items?.map((post) => {*/}
      {/*  return <p>{JSON.stringify(post, null, 2)}</p>;*/}
      {/*})}*/}
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Statistics
      </Typography>
      <SwitchChartLike />
    </div>
  );
};
