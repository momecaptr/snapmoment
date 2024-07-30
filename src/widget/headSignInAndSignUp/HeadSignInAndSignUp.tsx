import React from 'react';

import { GithubAuthButton, GoogleAuthButton } from '@/features';
import { Typography } from '@/shared/ui';

import s from './HeadSignInAndSignUp.module.scss';
type HeadSignInAndSignUpProps = {
  title: string;
};
export const HeadSignInAndSignUp = (props: HeadSignInAndSignUpProps) => {
  const { title } = props;

  return (
    <>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        {title}
      </Typography>
      <div className={s.subTitle}>
        <GoogleAuthButton />
        <GithubAuthButton />
      </div>
    </>
  );
};
