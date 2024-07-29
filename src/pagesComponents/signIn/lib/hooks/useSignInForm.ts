import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/shared/api';
import { SignInSchemaType, signInSchema } from '@/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

export const useSignInForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignInSchemaType>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema)
  });

  const router = useRouter();

  const [login, { isError, isLoading, isSuccess }] = useLoginMutation();

  const onSubmit = (data: SignInSchemaType) => {
    login(data).then((res) => localStorage.setItem('accessToken', String(res.data?.accessToken)));
    router.push('/profile');
  };

  return {
    control,
    errors,
    handleSubmit,
    isError,
    isLoading,
    isValid,
    onSubmit
  };
};
