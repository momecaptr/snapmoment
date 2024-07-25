import React from 'react';

import TimeManagement from '@/../public/assets/components/TimeManagement';
import { useConfirmRegistration } from '@/pagesComponents';
import { Button, Typography } from '@/shared/ui';

import s from './ResendVerificationLink.module.scss';
export const ResendVerificationLink = () => {
  useConfirmRegistration();

  return (
    <div>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Email verification link expired
      </Typography>
      <Typography as={'p'} className={s.subtitle} variant={'regular_text_16'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <div className={s.buttonBox}>
        <Button className={s.button}>Resend verification link</Button>
      </div>
      <div className={s.boxImg}>
        <TimeManagement />
      </div>
    </div>
  );
};
