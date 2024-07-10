import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { ModalKey } from '@/common/hooks/useModal';
import { appSlice } from '@/lib/features/app/model/appSlice';
import ForgotPasswordSchema, {
  ForgotPasswordFormValues
} from '@/pages/auth/forgotPassword/model/forgotPassword.schema';
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
