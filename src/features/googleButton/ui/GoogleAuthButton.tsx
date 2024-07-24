// components/GoogleAuthButton.js
import React from 'react';

import Google from '@/../public/assets/components/GoogleSvgrepoCom';
import { useAuthGoogle } from '@/features';

export const GoogleAuthButton = () => {
  const { login } = useAuthGoogle();

  return (
    <>
      <button onClick={() => login()}>
        <Google height={36} width={36} />
      </button>
    </>
  );
};
