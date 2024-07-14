import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { appSlice } from '@/app/model/appSlice';
import { ForgotPasswordFormValues, ForgotPasswordSchema } from '@/features/schemas/forgotPassword.schema';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { ModalKey } from '@/shared/hooks/useModal';
import { zodResolver } from '@hookform/resolvers/zod';

const useForgotPassword = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(ForgotPasswordSchema)
  });
  const dispatch = useAppDispatch();

  // const [recoverPassword, { isLoading }] = useRecoverPasswordMutation()
  const onSubmit = async ({ email }: ForgotPasswordFormValues) => {
    dispatch(appSlice.actions.toggleModal({ key: ModalKey.Success, open: true })); // await recoverPassword({ email }).unwrap()(`${path.checkEmail}/${email}`);
  };
  const { t } = useTranslation();

  return {
    control,
    handleSubmit,
    // isLoading,
    isValid,
    onSubmit,
    t
  };
};

export default useForgotPassword;
