import React from 'react';

import GitHub from '@/../public/assets/components/GithubSvgrepoCom';
import Google from '@/../public/assets/components/GoogleSvgrepoCom';
import { Typography } from '@/shared/typography/Typography';

import s from './HeadSignInAndSignUp.module.scss';
type HeadSignInAndSignUpProps = {
  title: string;
};
const HeadSignInAndSignUp = (props: HeadSignInAndSignUpProps) => {
  const { title } = props;

  return (
    <>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        {title}
      </Typography>
      <div className={s.subTitle}>
        {/* ! Это ниже, гугл и гитхаб - будут фичи (компонента или функция через children или пропс) */}
        <div className={s.google}>
          <Google height={36} width={36} />
        </div>
        <div className={s.github}>
          <GitHub height={36} width={36} />
        </div>
      </div>
    </>
  );
};

export default HeadSignInAndSignUp;
