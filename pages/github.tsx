import { useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

const GithubAuthHandler = () => {
  const router = useRouter();
  const { accessToken, email } = router.query; // получаем токен и email из query

  useEffect(() => {
    if (accessToken) {
      try {
        localStorage.setItem('accessToken', String(accessToken));

        // Расшифровываем токен и получаем данные пользователя
        const decodedToken = jwtDecode<{ userId: string }>(String(accessToken)); // Декодируем токен

        // Перенаправляем на страницу профиля
        router.push(`/profile/${decodedToken.userId}`);
      } catch (error) {
        console.error('Ошибка при декодировании токена:', error);
        // В случае ошибки, перенаправляем на страницу логина или отображаем сообщение
        router.push('/login');
      }
    }
  }, [accessToken, email, router]);

  return <div>Loading...</div>;
};

export default GithubAuthHandler;
