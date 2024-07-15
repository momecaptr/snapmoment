import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { CreateNewPasswordFormValues, createNewPasswordSchema } from '@/features/schemas/createNewPassword.schema';
import { zodResolver } from '@hookform/resolvers/zod';

const useCreateNewPassword = () => {
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

  return {
    control,
    errors,
    handleSubmit,
    // isLoading,
    isValid,
    onSubmit,
    t
  };
};

export default useCreateNewPassword;
