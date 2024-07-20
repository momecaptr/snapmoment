'use client';

import { useForm } from 'react-hook-form';

import { CreateNewPasswordFormValues, createNewPasswordSchema } from '@/features';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCreateNewPassword = () => {
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

  return {
    control,
    errors,
    handleSubmit,
    // isLoading,
    isValid,
    onSubmit,
  };
};
