import { useForm } from 'react-hook-form';

import { useAlert } from '@/entities';
import { appSlice } from '@/myApp/model/appSlice';
import { usePasswordRecoveryMutation } from '@/shared/api';
import { ModalKey, useAppDispatch, useModal } from '@/shared/lib';
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const usePasswordRecovery = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    watch
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '', recaptcha: '' },
    resolver: zodResolver(forgotPasswordSchema)
  });

  const { errorAlert } = useAlert();
  const { isOpen, setOpen } = useModal(ModalKey.Success);

  const [passwordRecovery] = usePasswordRecoveryMutation();
  const dispatch = useAppDispatch();

  const emailValue = watch('email');

  const onSubmit = async ({ email, recaptcha }: ForgotPasswordFormValues) => {
    try {
      await passwordRecovery({ email, recaptcha }).unwrap();
      dispatch(appSlice.actions.toggleModal({ key: ModalKey.Success, open: true }));
    } catch (e: any) {
      if (e.data && e.data.messages && e.data.messages.message) {
        errorAlert({ message: e.data.messages.message });
      } else {
        errorAlert({ message: 'Error!' });
      }
    }
  };

  return { control, emailValue, handleSubmit, isOpen, isValid, onSubmit, setOpen };
};
