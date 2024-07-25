import React from 'react';

import GoogleLoginButton from '@/pagesComponents/statistics/ui/GoogleLoginButton';
import { PostsTest } from '@/pagesComponents/statistics/ui/posts/PostsTest';
import { Button, Typography } from '@/shared/ui';

import s from './Statistics.module.scss';

export const Statistics = () => {
  return (
    <div>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Statistics
      </Typography>
      <GoogleLoginButton />
      <Button onClick={() => window.location.assign('https://inctagram.work/api/v1/auth/github/login')}>
        reg github
      </Button>
      {/*<SwitchChartLike />*/}
      <PostsTest />
      {/*<UsersTest />*/}
      {/*<ProfileTest />*/}
    </div>
  );
};
