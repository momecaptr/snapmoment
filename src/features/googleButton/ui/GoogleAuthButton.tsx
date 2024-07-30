import React from 'react';

import Google from '@/../public/assets/components/GoogleSvgrepoCom';
import { useAuthGoogle } from '@/features';

import s from './GoogleAuthButton.module.scss';

export const GoogleAuthButton = () => {
  const { login } = useAuthGoogle();
  const loginHandler = () => login();

  return (
    <>
      <button className={s.btn} onClick={loginHandler}>
        <Google className={s.icon} />
      </button>
    </>
  );
};
