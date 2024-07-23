// components/GoogleAuthButton.js
import React from 'react';

import Google from '@/../public/assets/components/GoogleSvgrepoCom';
import { useAuthGoogle } from '@/features/googleButton/lib/useAuthGoogle';

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
