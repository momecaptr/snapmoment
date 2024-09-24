import React from 'react';

import NotFound from '@/../pages/404';
import { useSignInForm } from '@/pagesComponents';
import { Button, Card, FormTextfield, Typography } from '@/shared/ui';
import { HeadSignInAndSignUp } from '@/widget';
import Link from 'next/link';

import s from './SignIn.module.scss';

export const SignIn = () => {
  const { control, handleSubmit, isError, isLoading, isValid, onSubmit } = useSignInForm();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={s.card}>
          <HeadSignInAndSignUp title={'Sign In'} />
          <div className={s.box_Input}>
            <FormTextfield className={s.input} control={control} label={'Email'} name={'email'} type={'email'} />
            <FormTextfield
              className={s.input}
              control={control}
              label={'Password'}
              name={'password'}
              type={'password'}
            />
          </div>
          <Typography as={Link} className={s.forgot} href={'/auth/password-recovery'} variant={'regular_text_14'}>
            Forgot Password
          </Typography>
          <Button className={s.button} disabled={!isValid} type={'submit'} fullWidth>
            Sign In
          </Button>
          <Typography className={s.question} variant={'regular_text_16'}>
            Don’t have an account?
          </Typography>
          <Typography as={Link} className={s.signUp} href={'/auth/sign-up'} variant={'regular_text_16'}>
            Sign Up
          </Typography>
        </Card>
      </form>
    </div>
  );
};
