'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { appSlice } from '@/app/model/appSlice';
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/features';
import { ModalKey, useAppDispatch, useModal } from '@/shared/lib';
import { zodResolver } from '@hookform/resolvers/zod';

export const useForgotPassword = () => {
  const {
    control,
    // formState: { isValid },
    handleSubmit,
    setValue
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotPasswordSchema)
  });
  const { isOpen, setOpen } = useModal(ModalKey.Success);
  const [captchaValue, setCaptchaValue] = useState(null);
  // заменить на исВалид с хукформ
  const [isValid, setIsValid] = useState(false);

  const dispatch = useAppDispatch();

  // const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const onSubmit = async ({ email }: ForgotPasswordFormValues) => {
    dispatch(appSlice.actions.toggleModal({ key: ModalKey.Success, open: true })); // await recoverPassword({ email }).unwrap()(`${path.checkEmail}/${email}`);
  };
  const handleCaptchaChange = (value: any) => {
    console.log('Captcha value:', value);
    setIsValid(true);
  };
  const { t } = useTranslation();

  return { captchaValue, control, handleCaptchaChange, handleSubmit, isOpen, isValid, onSubmit, setOpen };
};
