import React from 'react';

import GitHub from '@/../public/assets/components/GithubSvgrepoCom';

import s from './GithubAuthButton.module.scss';

export const GithubAuthButton = () => {
  const loginHandler = () => window.location.assign('https://inctagram.work/api/v1/auth/github/login');

  return (
    <button className={s.btn} onClick={loginHandler}>
      <GitHub className={s.icon} />
    </button>
  );
};
