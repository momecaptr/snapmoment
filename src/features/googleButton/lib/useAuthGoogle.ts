import { useGoogleOAuthMutation } from '@/shared/api';
import { useGoogleLogin } from '@react-oauth/google';

export const useAuthGoogle = () => {
  const [authMeGoogle] = useGoogleOAuthMutation();
  const login = useGoogleLogin({
    flow: 'auth-code',
    onError: (error) => {
      console.log('Login Failed:', error);
    },
    onSuccess: async (codeResponse) => {
      try {
        const resGoogleOAuth = await authMeGoogle({ code: codeResponse.code });
      } catch (error) {
        console.log('auth me Error', error);
      }
    }
  });

  return {
    login
  };
};
