import { useForm } from 'react-hook-form';

import { usePasswordRecoveryMutation } from '@/shared/api/auth/authApi';
import { BaseResponseType } from '@/shared/api/common/model/api.types';
import { useCustomToast } from '@/shared/lib';
import { ForgotPasswordFormValues, ResendCreatePasswordType, resendCreatePasswordSchema } from '@/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

export const useRecoveryCodeFailed = () => {
  const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation();
  const router = useRouter();
  const { email } = router.query;
  const {
    control,
    formState: { isValid },
    handleSubmit
  } = useForm<ForgotPasswordFormValues>({
    defaultValues: { recaptcha: '' },
    resolver: zodResolver(resendCreatePasswordSchema)
  });
  const { showToast } = useCustomToast();

  const onSubmit = async ({ recaptcha }: ResendCreatePasswordType) => {
    const res = await passwordRecovery({
      email: String(email),
      recaptcha
    });

    try {
      if ('data' in res) {
        showToast({ message: `We have sent a link to revalidate your identity to ${email}`, type: 'success' });
      } else {
        const err = res.error as BaseResponseType;

        showToast({ message: `Error - ${err.messages[0].message || 'unknown issue'}`, type: 'error' });
      }
    } catch (e) {
      showToast({ message: 'An unexpected error occurred. Please try again later.', type: 'error' });
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
