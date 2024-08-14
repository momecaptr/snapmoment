import React from 'react';

import TimeManagement from '@/../public/assets/components/TimeManagement';
import { useResendEmailMutation } from '@/shared/api/auth/authApi';
import { BaseResponseType } from '@/shared/api/common/model/api.types';
import { useCustomToast } from '@/shared/lib';
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
  const { showToast } = useCustomToast();
  const resendLink = async () => {
    const res = await resend({
      baseUrl: urlWithoutQuery as string,
      email: email as string
    });

    try {
      if ('data' in res) {
        showToast({ message: `We have sent a link to confirm your email to ${email}`, type: 'success' });
      } else {
        const err = res.error as BaseResponseType;

        showToast({ message: `Error - ${err.messages[0].message || 'unknown issue'}`, type: 'error' });
      }
    } catch (e) {
      showToast({ message: 'An unexpected error occurred. Please try again later.', type: 'error' });
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
