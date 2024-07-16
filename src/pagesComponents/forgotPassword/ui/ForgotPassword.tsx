'use client';

import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import useForgotPassword from '@/pagesComponents/forgotPassword/lib/hooks/useForgotPassword';
import SentEmailModal from '@/pagesComponents/forgotPassword/ui/sentEmailModal/SentEmailModal';
import { Button } from '@/shared/button/Button';
import { Card } from '@/shared/card/Card';
import { FormTextfield } from '@/shared/forms/FormTextfield';
import { ModalKey, useModal } from '@/shared/hooks/useModal';
import { Typography } from '@/shared/typography/Typography';
import Link from 'next/link';

import s from '@/pagesComponents/forgotPassword/ui/ForgotPassword.module.scss';

const ForgotPassword = () => {
  const { control, handleSubmit, isValid, onSubmit } = useForgotPassword();
  const { isOpen, setOpen } = useModal(ModalKey.Success);

  return (
    <>
      <SentEmailModal open={isOpen} setOpen={setOpen} />
      <div className={s.container}>
        <Card>
          <section className={s.content}>
            <Typography as={'h1'} variant={'h1'}>
              Forgot Password
            </Typography>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <FormTextfield
                className={s.formTextfield}
                control={control}
                label={'Email'}
                name={'email'}
                placeholder={'Email'}
              />
              <Typography className={s.information} variant={'regular_text_14'}>
                Enter your email address and we will send you further instructions
              </Typography>

              <Button className={s.signIn} disabled={!isValid} fullWidth>
                Send Link
              </Button>
            </form>

            <Typography as={Link} className={s.backSignIn} href={'/sign-in'} variant={'h3'}>
              Back to Sign In
            </Typography>
            {/*ключ от гугла тестовый */}
            <ReCAPTCHA sitekey={'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'} theme={'dark'} />
          </section>
        </Card>
      </div>{' '}
    </>
  );
};

export default ForgotPassword;
