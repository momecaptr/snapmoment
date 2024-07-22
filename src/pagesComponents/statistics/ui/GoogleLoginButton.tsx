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
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setFavoriteDeck({ code: tokenResponse.access_token });
    }
  });

  return <Button onClick={() => login()}>Sign in with Google 🚀</Button>;
};

export default GoogleLoginButton;
