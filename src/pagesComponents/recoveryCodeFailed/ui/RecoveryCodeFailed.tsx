import React from 'react';
import { useForm } from 'react-hook-form';

import TimeManagement from '@/../public/assets/components/TimeManagement';
import { useAlert } from '@/entities';
import { ReCaptcha } from '@/features/reCaptcha/ReCaptcha';
import { BaseResponseType, usePasswordRecoveryMutation } from '@/shared/api';
import { ForgotPasswordFormValues, ResendCreatePasswordType, resendCreatePasswordSchema } from '@/shared/schemas';
import { Button, Typography } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import s from './RecoveryCodeFailed.module.scss';
export const RecoveryCodeFailed = () => {
  // const [resend] = useResendEmailMutation();
  const [passwordRecovery] = usePasswordRecoveryMutation();
  const email = localStorage.getItem('email');
  const { errorAlert, successAlert } = useAlert();
  const {
    control,
    formState: { isValid },
    handleSubmit,
    watch
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { recaptcha: '' },
    resolver: zodResolver(resendCreatePasswordSchema)
  });
  const onSubmit = async ({ recaptcha }: ResendCreatePasswordType) => {
    const res = await passwordRecovery({
      email: String(email),
      recaptcha
    });

    localStorage.removeItem('email');

    try {
      if ('data' in res) {
        successAlert({ message: `We have sent a link to revalidate your identity to ${email}` });
      } else {
        const err = res.error as BaseResponseType;

        errorAlert({ message: `Error - ${err.messages[0].message || 'unknown issue'}` });
      }
    } catch (e) {
      errorAlert({ message: 'An unexpected error occurred. Please try again later.' });
    }
  };

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
        <Button className={s.button} disabled={!isValid}>
          Resend verification link
        </Button>
      </form>
      <div className={s.boxImg}>
        <TimeManagement />
      </div>
    </div>
  );
};
