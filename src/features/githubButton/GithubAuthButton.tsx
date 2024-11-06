import React from 'react';

import GitHub from '@/../public/assets/components/GithubSvgrepoCom';
import { useLazyGithubOAuthQuery } from '@/shared/api/auth/authApi';
import axios from 'axios';

import s from './GithubAuthButton.module.scss';

export const GithubAuthButton = () => {
  // Старый способ
  // const loginHandler = () => window.location.assign('https://inctagram.work/api/v1/auth/github/login');
  const redirectUrl = 'http://localhost:3000/github';
  const [login] = useLazyGithubOAuthQuery();
  const loginHandler = async () => {
    try {
      await axios.get('https://inctagram.work/api/v1/auth/github/login', {
        params: {
          redirect_url: redirectUrl
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    // <button className={s.btn} onClick={() => login({ redirectUrl })}>
    <button className={s.btn} onClick={() => loginHandler()}>
      <GitHub className={s.icon} />
    </button>
  );
};
