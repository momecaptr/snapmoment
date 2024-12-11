import React from 'react';

import GitHub from '@/../public/assets/components/GithubSvgrepoCom';

import s from './GithubAuthButton.module.scss';

export const GithubAuthButton = () => {
  // Старый способ
  // const loginHandler = () => window.location.assign('https://inctagram.work/api/v1/auth/github/login');

  const { host, protocol } = window.location;
  // const redirectUrl = 'http://localhost:3000/github';
  const redirectUrl = `${protocol}//${host}/github`;
  const loginHandler = () => window.location.assign(`https://inctagram.work/api/v1/auth/github/login?${redirectUrl}`);

  return (
    // <button className={s.btn} onClick={() => login({ redirectUrl })}>
    <button className={s.btn} onClick={() => loginHandler()}>
      <GitHub className={s.icon} />
    </button>
  );
};
