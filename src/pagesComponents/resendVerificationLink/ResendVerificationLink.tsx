import React from 'react';

import TimeManagement from '@/../public/assets/components/TimeManagement';
import { useAlert } from '@/entities';
import { BaseResponseType, useResendEmailMutation } from '@/shared/api';
import { Button, Typography } from '@/shared/ui';
import { useRouter } from 'next/router';

import s from './ResendVerificationLink.module.scss';
export const ResendVerificationLink = () => {
  const [resend] = useResendEmailMutation();
  const router = useRouter();
  const { query } = router;
  const fullUrl = router.asPath;
  const urlWithoutQuery = fullUrl.split('?')[0];
  const { code, email } = query;
  const { errorAlert, successAlert } = useAlert();
  const resendLink = async () => {
    const res = await resend({
      baseUrl: urlWithoutQuery as string,
      email: email as string
    });

    try {
      if ('data' in res) {
        successAlert({ message: `We have sent a link to confirm your email to ${email}` });
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
        Email verification link expired
      </Typography>
      <Typography as={'p'} className={s.subtitle} variant={'regular_text_16'}>
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>
      <div className={s.buttonBox}>
        <Button className={s.button} onClick={resendLink}>
          Resend verification link
        </Button>
      </div>
      <div className={s.boxImg}>
        <TimeManagement />
      </div>
    </div>
  );
};
