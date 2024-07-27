import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/shared/api';
import { SignInSchemaType, signInSchema } from '@/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export const useSignInForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignInSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema)
  });

  const [login, { isError, isLoading, isSuccess }] = useLoginMutation();
  const onSubmit = (data: SignInSchemaType) => {
    login(data).then((res) => localStorage.setItem('accessToken', String(res.data?.accessToken)));
  };

  return {
    control,
    errors,
    handleSubmit,
    isLoading,
    isSuccess,
    isValid,
    onSubmit
  };
};
