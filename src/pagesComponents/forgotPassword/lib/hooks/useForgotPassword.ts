import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { appSlice } from '@/myApp/model/appSlice';
import { ModalKey, useAppDispatch, useModal } from '@/shared/lib';
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/shared/schemas';
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

  return { captchaValue, control, handleCaptchaChange, handleSubmit, isOpen, isValid, onSubmit, setOpen };
};
