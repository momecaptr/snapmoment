// components/GoogleAuthButton.js
import React from 'react';

import Google from '@/../public/assets/components/GoogleSvgrepoCom';

export const GoogleAuthButton = () => {
  // 1 -- делаем запрос OAUTH GOOGLE (он сам работает, нам писать его не нужно)
  const handleLogin = () => {
    const clientId = '617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3001/api/auth/callback-google';
    const scope = 'email profile';
    const responseType = 'code';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}&response_type=${responseType}`;

    window.location.assign(authUrl);
    const code = 'ОТВЕТ ОТ ГУГЛА ОAUTH2'; // НО ЭТО ЕЩЕ  НЕ АВТОРИЗАЦИЯ
  };

  // 2 БЕРЕМ code и вставляем в ЗАПРОС (создаем запрос на POST в swagger /api/v1/auth/google/login и отдаем code)
  // 3 ПОЛУЧАЕННЫЙ ОТВЕТ ЭТО И БУДЕТ ДАННЫЕ ПОЛЬЗОВАТЕЛЯ и их нужно будет как-то обработать. НИХУЯ НЕ ПОНЯТНО

  //  ВОТ GPT говорит
  //   1. Перенаправление пользователя на authUrl:
  //   Этот шаг у вас уже реализован в функции handleLogin.
  //
  //   2. Обработка кода авторизации на сервере:
  //   Когда пользователь авторизуется и Google перенаправляет его обратно на ваш сервер, в URL будет содержаться код авторизации. Вам нужно будет извлечь этот код и обменять его на токен доступа.
  //
  //   3. Обмен кода на токен доступа:
  //   Используйте код авторизации для запроса токена доступа к Google API. Это можно сделать с помощью HTTP POST запроса к Google Token Endpoint.
  //
  //   4. Получение данных пользователя:
  //   С помощью полученного токена доступа, вы можете запросить данные пользователя от Google API.
  return (
    <button onClick={handleLogin}>
      <Google />
    </button>
  );
};
