import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/shared/api/auth/authApi';
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

  const onSubmit = async (data: SignInSchemaType) => {
    await login(data);
    // ! Редиректить нужно с await! + переадресацию можно сделать в authApi login
    router.replace('/profile');
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
