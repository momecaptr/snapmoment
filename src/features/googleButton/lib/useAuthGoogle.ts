import { useGoogleOAuthMutation, useMeQuery } from '@/shared/api/auth/authApi';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

export const useAuthGoogle = () => {
  const [authMeGoogle] = useGoogleOAuthMutation();
  const { data: me, isSuccess: isMeQuerySuccess } = useMeQuery(); // добавил isSuccess для запроса me
  const router = useRouter();

  const login = useGoogleLogin({
    flow: 'auth-code',
    onError: (error) => {
      console.log('Login Failed:', error);
    },
    onSuccess: async (codeResponse) => {
      try {
        const resGoogleOAuth = await authMeGoogle({ code: codeResponse.code });
        const accessToken = resGoogleOAuth.data?.accessToken;

        localStorage.setItem('accessToken', JSON.stringify(accessToken));
        // Расшифровываем токен и получаем данные пользователя
        const decodedToken = jwtDecode<{ userId: string }>(accessToken ? accessToken : '');

        // Перенаправляем на страницу профиля
        router.push(`/profile/${decodedToken.userId}`);
      } catch (error) {
        console.log('auth me Error', error);
      }
    }
  });

  /*useEffect(() => {
    if (isMeQuerySuccess && me?.userId) {
      //router.push(`/profile/${me.userId}`);

      // Перенаправляем на страницу профиля
      router.push(`/profile/${decodedToken.userId}`);
    }
  }, [isMeQuerySuccess, me, router]);*/

  return {
    login
  };
};
