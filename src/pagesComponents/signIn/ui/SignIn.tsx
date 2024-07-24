import React from 'react';

import { useSignInForm } from '@/pagesComponents';
import { Button, Card, FormTextfield, Typography } from '@/shared/ui';
import { HeadSignInAndSignUp } from '@/widget';
import Link from 'next/link';

import s from './SignIn.module.scss';

export const SignIn = () => {
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
          <Button className={s.button} disabled={!isValid} type={'submit'} fullWidth>
            Sign In
          </Button>
          <Typography as={'p'} className={s.question} variant={'regular_text_16'}>
            Don’t have an account?
          </Typography>
          {/*<Typography as={Link} className={s.signUp} href={'/sign-up'} variant={'regular_link'}>
            Sign Up
          </Typography>*/}
          <Link className={s.signUp} href={'/sign-up'}>
            Sign Up
          </Link>
        </Card>
      </form>
    </div>
  );
};
