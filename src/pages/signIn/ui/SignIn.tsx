'use client';
import React from 'react';

import useSignInForm from '@/pages/signIn/lib/hooks/useSignInForm';
import { Button } from '@/shared/button/Button';
import { Card } from '@/shared/card/Card';
import { FormTextfield } from '@/shared/forms/FormTextfield';
import { Typography } from '@/shared/typography/Typography';
import HeadSignInAndSignUp from '@/widget/headSignInAndSignUp/HeadSignInAndSignUp';
import Link from 'next/link';

import s from '@/pages/signIn/ui/SignIn.module.scss';

const SignIn = () => {
  const { control, errors, handleSubmit, isValid, onSubmit } = useSignInForm();

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
          <Typography as={'p'} className={s.forgot} variant={'regular_text_14'}>
            Forgot Password
          </Typography>
          <Button className={s.button} type={'submit'} fullWidth>
            Sign In
          </Button>
          <Typography as={'p'} className={s.question} variant={'regular_text_16'}>
            Don’t have an account?
          </Typography>
          <Typography as={Link} className={s.signUp} href={'/sign-up'} variant={'regular_link'}>
            Sign Up
          </Typography>
        </Card>
      </form>
    </div>
  );
};

export default SignIn;
