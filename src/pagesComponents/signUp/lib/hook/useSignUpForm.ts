import { useForm } from 'react-hook-form';

import { useRegistrationMutation } from '@/shared/api/auth/authApi';
import { BaseResponseType } from '@/shared/api/common/model/api.types';
import { useCustomToast } from '@/shared/lib';
import { SignUpSchemaType, signUpSchema } from '@/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const useSignUpForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignUpSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema)
  });

  const [register] = useRegistrationMutation();
  const { showToast } = useCustomToast();

  const onSubmit = async (data: SignUpSchemaType) => {
    const res = await register({ email: data.email, password: data.password, userName: data.username });

    try {
      if ('data' in res) {
        showToast({ message: `We have sent a link to confirm your email to ${data.email}`, type: 'success' });
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
    errors,
    handleSubmit,
    isValid,
    onSubmit
  };
};
