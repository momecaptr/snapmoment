import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { appSlice } from '@/app/model/appSlice';
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/features/schemas/authSchema/authShema';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ModalKey } from '@/shared/lib/hooks/useModal';
import { zodResolver } from '@hookform/resolvers/zod';

const useForgotPassword = () => {
  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { email: '' },
    resolver: zodResolver(forgotPasswordSchema)
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
