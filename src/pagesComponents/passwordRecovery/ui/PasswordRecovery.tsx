import React from 'react';

import { ReCaptcha } from '@/features/reCaptcha/ReCaptcha';
import { SentEmailModal, usePasswordRecovery } from '@/pagesComponents';
import { Button, Card, FormTextfield, Typography } from '@/shared/ui';
import Link from 'next/link';

import s from './PasswordRecovery.module.scss';

export const PasswordRecovery = () => {
  const { control, emailValue, handleSubmit, isOpen, isValid, onSubmit, setOpen } = usePasswordRecovery();

  return (
    <>
      <SentEmailModal email={emailValue} open={isOpen} setOpen={setOpen} />
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

            <ReCaptcha control={control} />
          </section>
        </Card>
      </div>
    </>
  );
};
