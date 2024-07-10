import React from 'react';

import Boy from '@/common/assets/components/BoyDefault';
import { Button } from '@/components/ui/button/Button';
import { Typography } from '@/components/ui/typography/Typography';

import s from './emailVerification.module.scss';
const EmailVerification = () => {
  return (
    <div>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Email verification link expired
      </Typography>
      <div className={s.boxSubtitle}>
        <Typography as={'p'} className={s.subtitle} variant={'regular_text_16'}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
      </div>

      <div className={s.buttonBox}>
        <Button className={s.button}>Resend verification link</Button>
      </div>
      <div className={s.boxImg}>
        <Boy />
      </div>
    </div>
  );
};

export default EmailVerification;
