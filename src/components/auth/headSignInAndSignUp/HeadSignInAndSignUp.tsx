import React from 'react';

import GitHub from '@/common/assets/components/GithubSvgrepoCom';
import Google from '@/common/assets/components/GoogleSvgrepoCom';
import { Typography } from '@/components/ui/typography/Typography';

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
        <div className={s.google}>
          <Google height={36} width={36} />
        </div>
        <div>
          <GitHub height={36} width={36} />
        </div>
      </div>
    </>
  );
};

export default HeadSignInAndSignUp;
