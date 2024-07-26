import { useForm } from 'react-hook-form';

import { useLoginMutation } from '@/shared/api';
import { SignInSchemaType, signInSchema } from '@/shared/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

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

  const [login, { isError, isSuccess }] = useLoginMutation();
  const onSubmit = async (data: SignInSchemaType) => {
    // login(data).then((res) => localStorage.setItem('accessToken', JSON.stringify(res.data?.accessToken)));
    // if (isSuccess) {
    //   router.push('/');
    // }
    const res = await signIn('credentials', { email: data.email, password: data.password, redirect: false });

    if (res && !res.error) {
      router.push('/');
    } else {
      console.log(res);
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
