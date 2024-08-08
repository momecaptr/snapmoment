import React from 'react';

import TimeManagement from '@/../public/assets/components/TimeManagement';
import { ReCaptcha } from '@/features';
import { useRecoveryCodeFailed } from '@/pagesComponents/recoveryCodeFailed/lib/useRecoveryCodeFailed';
import { Button, Typography } from '@/shared/ui';

import s from './RecoveryCodeFailed.module.scss';
export const RecoveryCodeFailed = () => {
  const { control, handleSubmit, isLoading, isValid, onSubmit } = useRecoveryCodeFailed();

  return (
    <div>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Verification link to create new password has expired
      </Typography>
      <Typography as={'p'} className={s.subtitle} variant={'regular_text_16'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <form className={s.buttonBox} onSubmit={handleSubmit(onSubmit)}>
        <ReCaptcha control={control} />
        <Button className={s.button} disabled={!isValid && isLoading}>
          Resend verification link
        </Button>
      </form>
      <div className={s.boxImg}>
        <TimeManagement />
      </div>
    </div>
  );
};
