import React from 'react';

import { useSignUpForm } from '@/pagesComponents';
import { Button, Card, FormCheckbox, FormTextfield, Typography } from '@/shared/ui';
import { HeadSignInAndSignUp } from '@/widget';
import Link from 'next/link';

import s from './SignUp.module.scss';

export const SignUp = () => {
  const { control, errors, handleSubmit, isValid, onSubmit } = useSignUpForm();

  return (
    <div className={s.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className={s.card}>
          <HeadSignInAndSignUp title={'Sign Up'} />
          <div className={s.box_Input}>
            <FormTextfield
              className={s.input}
              control={control}
              error={'Какое-то соообщение'}
              label={'Username'}
              name={'username'}
              type={'text'}
            />
            <FormTextfield className={s.input} control={control} label={'Email'} name={'email'} type={'email'} />
            <FormTextfield
              className={s.input}
              control={control}
              label={'Password'}
              name={'password'}
              type={'password'}
            />
            <FormTextfield
              className={s.input}
              control={control}
              label={'Password confirmation'}
              name={'confirmPassword'}
              type={'password'}
            />
          </div>

          <FormCheckbox
            label={
              <>
                <Typography as={'p'} variant={'small_text'}>
                  I agree to the
                </Typography>
                <Typography as={Link} className={s.link} href={'/terms'} variant={'small_link'}>
                  Terms of Service
                </Typography>
                <Typography as={'p'} variant={'small_text'}>
                  and
                </Typography>
                <Typography as={Link} className={s.link} href={'/privacy'} variant={'small_link'}>
                  Privacy Policy
                </Typography>
              </>
            }
            className={s.agreement}
            control={control}
            name={'rememberMe'}
          />

          <Button className={s.button} type={'submit'} fullWidth>
            Sign Up
          </Button>
          <Typography as={'p'} className={s.question} variant={'regular_text_16'}>
            Don’t have an account?
          </Typography>
          {/*<Typography as={Link} className={s.signIn} href={'/sign-in'} variant={'regular_link'}>
            Sign In
          </Typography>*/}
          <Link className={s.signIn} href={'/sign-in'}>
            Sign In
          </Link>
        </Card>
      </form>
    </div>
  );
};
