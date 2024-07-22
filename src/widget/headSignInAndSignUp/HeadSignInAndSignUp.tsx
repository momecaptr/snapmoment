import React from 'react';

import { Typography } from '@/shared/ui';
import { GithubAuthButton } from '@/widget/headSignInAndSignUp/githubButton/GithubAuthButton';
import { GoogleAuthButton } from '@/widget/headSignInAndSignUp/googleButton/GoogleAuthButton';

import s from './HeadSignInAndSignUp.module.scss';
type HeadSignInAndSignUpProps = {
  title: string;
};
export const HeadSignInAndSignUp = (props: HeadSignInAndSignUpProps) => {
  const { title } = props;

  // // МЫ ТУТ ПОЛУЧИМ CLIENT_ID, который будет в URL. Затем нужно будет вырезать этот ID и отправить на сервер
  // console.log('--> CLIENT_ID'); // ЭТО ID клиентского ПРИЛОЖЕНИЯ, НЕ ПОЛЬЗОВАТЕЛЯ (то есть зареганное приложение для API гугл или гитхаб)
  // // const CLIENT_ID = 'google'; // ЭТО ID, которое получается при создании приложения
  // const CLIENT_ID = '617342613759-f3kbvgm8l310fn40vh6qna2pv8u2uccr.apps.googleusercontent.com';
  // const REDIRECT_URL = 'https://localhost:3000/oauth-callback-google'; // ! любой на ваш клиент/ ЧТО ЗА ЛЮБОЙ???
  // // const url = 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=' + CLIENT_ID + '&redirect_uri=' + REDIRECT_URL + '&scope=https://www.googleapis.com/auth/userinfo.email'
  // const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}`;
  //
  // window.location.assign('https://inctagram.work/api/v1/auth/github/login');

  //  На фронте мы просто идем с какими-то креденшиалами на наш роут (какой наш роут???), получаем код и идем уже за данными
  return (
    <>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        {title}
      </Typography>
      <div className={s.subTitle}>
        {/* ! Это ниже, гугл и гитхаб - будут фичи (компонента или функция через children или пропс) */}
        {/*<div className={s.google}>*/}
        {/*  <Google height={36} width={36} />*/}
        {/*</div>*/}
        <GoogleAuthButton />
        {/*<div className={s.github}>*/}
        {/*  <GitHub height={36} width={36} />*/}
        {/*</div>*/}
        <GithubAuthButton />
      </div>
    </>
  );
};
