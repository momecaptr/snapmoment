import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { useLazyMeQuery, useLoginMutation } from '@/shared/api/auth/authApi';
import { useCustomToast } from '@/shared/lib';
import { SignInSchemaType, signInSchema } from '@/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Router from 'next/router';

export const useSignInForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignInSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema)
  });
  const [loading, setLoading] = useState(false);
  const [login, { isError }] = useLoginMutation();
  const [getMe] = useLazyMeQuery();
  const { showToast } = useCustomToast();

  const onSubmit = async (data: SignInSchemaType) => {
    setLoading(true);
    try {
      await login(data).unwrap();

      const resMe = await getMe().unwrap();

      if (resMe.userId) {
        await Router.replace(`/profile/${resMe.userId}`);

        showToast({ message: 'Success login', type: 'success' });
      } else {
        showToast({ message: 'User ID not found in response.', type: 'error' });
      }
    } catch (error) {
      showToast({ message: 'Error during login or fetching user data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    errors,
    handleSubmit,
    isError,
    isLoading: loading,
    isValid,
    onSubmit
  };
};
