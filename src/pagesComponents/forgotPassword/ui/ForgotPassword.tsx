import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import { SentEmailModal, useForgotPassword } from '@/pagesComponents';
import { Button, Card, FormTextfield, Typography } from '@/shared/ui';
// import { ModalKey, useModal } from '@/shared/utils';
import Link from 'next/link';

import s from './ForgotPassword.module.scss';

export const ForgotPassword = () => {
  const { control, handleCaptchaChange, handleSubmit, isOpen, isValid, onSubmit, setOpen } = useForgotPassword();

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
            {/*<Controller*/}
            {/*  render={({ onChange }: FieldValues) => (*/}
            {/*    <ReCAPTCHA*/}
            {/*      onChange={(value) => {*/}
            {/*        handleCaptchaChange(value);*/}
            {/*        onChange(value);*/}
            {/*      }}*/}
            {/*      sitekey={'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}*/}
            {/*      theme={'dark'}*/}
            {/*    />*/}
            {/*  )}*/}
            {/*  control={control}*/}
            {/*  name={'recaptcha'}*/}
            {/*/>*/}

            <ReCAPTCHA
              onChange={(value) => {
                handleCaptchaChange(value);
              }}
              sitekey={'6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
              theme={'dark'}
            />
          </section>
        </Card>
      </div>{' '}
    </>
  );
};
