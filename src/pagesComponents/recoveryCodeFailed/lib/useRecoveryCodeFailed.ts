import { useForm } from 'react-hook-form';

import { useAlert } from '@/entities';
import { BaseResponseType, usePasswordRecoveryMutation } from '@/shared/api';
import { ForgotPasswordFormValues, ResendCreatePasswordType, resendCreatePasswordSchema } from '@/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

export const useRecoveryCodeFailed = () => {
  const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation();
  const router = useRouter();
  const { email } = router.query;
  const { errorAlert, successAlert } = useAlert();
  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { recaptcha: '' },
    resolver: zodResolver(resendCreatePasswordSchema)
  });
  const onSubmit = async ({ recaptcha }: ResendCreatePasswordType) => {
    const res = await passwordRecovery({
      email: String(email),
      recaptcha
    });

    try {
      if ('data' in res) {
        successAlert({ message: `We have sent a link to revalidate your identity to ${email}` });
      } else {
        const err = res.error as BaseResponseType;

        errorAlert({ message: `Error - ${err.messages[0].message || 'unknown issue'}` });
      }
    } catch (e) {
      errorAlert({ message: 'An unexpected error occurred. Please try again later.' });
    }
  };

  return {
    control,
    handleSubmit,
    isLoading,
    isValid,
    onSubmit
  };
};
