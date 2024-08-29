import React from 'react';
import { useForm } from 'react-hook-form';

import { useCreateNewPasswordMutation } from '@/shared/api/auth/authApi';
import { useCustomToast } from '@/shared/lib';
import { CreateNewPasswordFormValues, createNewPasswordSchema } from '@/shared/schemas';
import { Button, Card, FormTextfield, Typography } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

import s from './CreateNewPassword.module.scss';

export const CreateNewPassword = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<CreateNewPasswordFormValues>({
    defaultValues: { confirmPassword: '', password: '' },
    resolver: zodResolver(createNewPasswordSchema)
  });
  const router = useRouter();
  const { code } = router.query;
  const [createNewPassword] = useCreateNewPasswordMutation();
  const { showToast } = useCustomToast();

  const onSubmit = async ({ password }: CreateNewPasswordFormValues) => {
    try {
      await createNewPassword({
        newPassword: password,
        recoveryCode: String(code)
      });

      showToast({ message: 'The password was successfully updated', type: 'success' });

      await router.push('/auth/sign-in');
    } catch (e) {
      showToast({ message: 'Password update error', type: 'error' });
    }
  };

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
