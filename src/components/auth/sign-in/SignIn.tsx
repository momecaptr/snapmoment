import React from 'react';
import { useForm } from 'react-hook-form';

import { SchemaType, schema } from '@/common/ZodSchema/ZodSchema';
import HeadSignInAndSignUp from '@/components/auth/headSignInAndSignUp/HeadSignInAndSignUp';
import { Button } from '@/components/ui/button/Button';
import { Card } from '@/components/ui/card/Card';
import { FormTextfield } from '@/components/ui/forms/FormTextfield';
import { Typography } from '@/components/ui/typography/Typography';
import { zodResolver } from '@hookform/resolvers/zod';

import s from './SignIn.module.scss';

const SignIn = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register
  } = useForm<SchemaType>({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data: SchemaType) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className={s.card}>
        <HeadSignInAndSignUp title={'Sign In'} />
        <div className={s.box_Input}>
          <FormTextfield className={s.input} control={control} label={'Email'} name={'email'} type={'email'} />
          {errors.email && <p>{errors.email.message}</p>}
          <FormTextfield className={s.input} control={control} label={'Password'} name={'password'} type={'password'} />
          {errors.password && <p>{errors.password.message}</p>}
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
        <Typography as={'p'} className={s.signUp} variant={'regular_text_14'}>
          Sign Up
        </Typography>
      </Card>
    </form>
  );
};

export default SignIn;
