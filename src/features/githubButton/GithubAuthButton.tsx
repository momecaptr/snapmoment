import React from 'react';

import GitHub from '@/../public/assets/components/GithubSvgrepoCom';

import s from './GithubAuthButton.module.scss';

export const GithubAuthButton = () => {
  return (
    <button className={s.btn} onClick={() => window.location.assign('https://inctagram.work/api/v1/auth/github/login')}>
      <GitHub height={36} width={36} />
    </button>
  );
};
