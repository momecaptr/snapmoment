import React from 'react';

import { useGoogleOAuth2Mutation } from '@/myApp/api/inctagramApi';
import { Button } from '@/shared/ui';
import { useGoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = () => {
  const [setFavoriteDeck] = useGoogleOAuth2Mutation();

  // const handleSuccess = (response: any) => {};
  //
  // const handleError = () => {
  //   console.error('Login failed');
  // };
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setFavoriteDeck({ code: tokenResponse.code });
    }
  });

  return <Button onClick={() => login()}>Sign in with Google 🚀</Button>;
};

export default GoogleLoginButton;

// const login = (): void => {
// const CLIENT_ID = '535513477329-m3nj9m45g3r0sm8kdh5i8c5jkjs88f0.apps.googleusercontent.com'
// const REDIRECT_URL = 'http://localhost:3001/oauth-callback-google'// любой на ваш клиент
// const scope = 'email profile'; // данные которые мы запрашиваем
// const url = `https://accounts.google.com/o/oauth2/v2/auth?
//  scope=${scope}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}`;
// window.location.assign(url);
// }
