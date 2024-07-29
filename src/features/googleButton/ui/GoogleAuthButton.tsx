// components/GoogleAuthButton.js
import React from 'react';

import Google from '@/../public/assets/components/GoogleSvgrepoCom';
import { useAuthGoogle } from '@/features';

import s from './GoogleAuthButton.module.scss';

export const GoogleAuthButton = () => {
  const { login } = useAuthGoogle();

  return (
    <>
      <button className={s.btn} onClick={() => login()}>
        <Google height={36} width={36} />
      </button>
    </>
  );
};
