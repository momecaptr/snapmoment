// components/GoogleAuthButton.js
import React from 'react';

import Google from '@/../public/assets/components/GoogleSvgrepoCom';
import { useGoogleOAuthMutation } from '@/myApp/api/snapmomentAPI';
import { useGoogleLogin } from '@react-oauth/google';

export const GoogleAuthButton = () => {
  const [authMeGoogle] = useGoogleOAuthMutation();
  const login = useGoogleLogin({
    flow: 'auth-code', // ВОТ ЭТА СТРОКА ОБЯЗАТЕЛЬНА
    onError: (error) => {
      console.log('Login Failed:', error);
    },
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const response = codeResponse;

      try {
        const asdas = await authMeGoogle({ code: response.code });

        console.log(asdas);
      } catch (er) {
        console.log('auth me Error', er);
      }

      console.log(response.code);
    }
  });

  return (
    <>
      <button onClick={() => login()}>
        <Google />
      </button>
    </>
  );
};
