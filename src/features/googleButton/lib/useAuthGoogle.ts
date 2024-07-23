import { useGoogleOAuthMutation } from '@/myApp/api/snapmomentAPI';
import { useGoogleLogin } from '@react-oauth/google';

export const useAuthGoogle = () => {
  const [authMeGoogle] = useGoogleOAuthMutation();
  const login = useGoogleLogin({
    flow: 'auth-code', // ВОТ ЭТА СТРОКА ОБЯЗАТЕЛЬНА
    onError: (error) => {
      console.log('Login Failed:', error);
    },
    onSuccess: async (codeResponse) => {
      // console.log(codeResponse);
      try {
        const resGoogleOAuth = await authMeGoogle({ code: codeResponse.code });

        // console.log(resGoogleOAuth);
      } catch (error) {
        console.log('auth me Error', error);
      }

      // console.log(codeResponse.code);
    }
  });

  return {
    login
  };
};
