'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CreateNewPasswordFormValues, createNewPasswordSchema } from '@/features/schemas/authSchema/authShema';
import { Button } from '@/shared/button/Button';
import { Card, Typography } from '@/shared/ui';
import { FormTextfield } from '@/shared/ui/forms/FormTextfield';
import { zodResolver } from '@hookform/resolvers/zod';

import s from '@/pagesComponents/createNewPassword/ui/CreateNewPassword.module.scss';

const CreateNewPassword = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<CreateNewPasswordFormValues>({
    defaultValues: { confirmPassword: '', password: '' },
    resolver: zodResolver(createNewPasswordSchema)
  });

  const onSubmit = async ({ password }: CreateNewPasswordFormValues) => {
    console.log(password);
  };
  const { t } = useTranslation();

  return (
    <>
      <div className={s.container}>
        <Card>
          <section className={s.content}>
            <Typography as={'h1'} variant={'h1'}>
              Create New Password
            </Typography>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <FormTextfield
                className={s.formTextfield}
                control={control}
                label={'New Password'}
                name={'password'}
                placeholder={'Password'}
                type={'password'}
              />
              <FormTextfield
                className={s.formTextfield}
                control={control}
                label={'Password confirmation'}
                name={'confirmPassword'}
                placeholder={'Password'}
                type={'password'}
              />
              <Typography className={s.information} variant={'regular_text_14'}>
                Enter your email address and we will send you further instructions
              </Typography>
              <Button className={s.signIn} type={'submit'} fullWidth>
                Create new Password
              </Button>
            </form>
          </section>
        </Card>
      </div>
    </>
  );
};

export default CreateNewPassword;
