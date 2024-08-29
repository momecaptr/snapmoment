import { useGoogleOAuthMutation } from '@/shared/api/auth/authApi';
import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

export const useAuthGoogle = () => {
  const [authMeGoogle] = useGoogleOAuthMutation();
  const router = useRouter();
  const login = useGoogleLogin({
    flow: 'auth-code',
    onError: (error) => {
      console.log('Login Failed:', error);
    },
    onSuccess: async (codeResponse) => {
      try {
        const resGoogleOAuth = await authMeGoogle({ code: codeResponse.code });

        localStorage.setItem('accessToken', JSON.stringify(resGoogleOAuth.data?.accessToken));
        router.push('/profile');
      } catch (error) {
        console.log('auth me Error', error);
      }
    }
  });

  return {
    login
  };
};
