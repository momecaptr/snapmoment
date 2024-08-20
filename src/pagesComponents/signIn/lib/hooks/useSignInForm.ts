import { useForm } from 'react-hook-form';

import { useLazyMeQuery, useLoginMutation } from '@/shared/api/auth/authApi';
import { useCustomToast } from '@/shared/lib';
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

  const [login, { isError, isLoading: isLoadingLogin }] = useLoginMutation();
  const [getMe, { isLoading: isLoadingMe }] = useLazyMeQuery();
  const { showToast } = useCustomToast();

  const onSubmit = async (data: SignInSchemaType) => {
    try {
      await login(data).unwrap();

      const resMe = await getMe().unwrap();

      if (resMe.userId) {
        // showToast({ message: 'Me success', type: 'error' });

        router.replace(`/profile/${resMe.userId}`);

        showToast({ message: 'Success login', type: 'success' });
      } else {
        showToast({ message: 'User ID not found in response.', type: 'error' });
      }
    } catch (error) {
      showToast({ message: 'Error during login or fetching user data', type: 'error' });
    }
    // ! Редиректить нужно с await! + переадресацию можно сделать в authApi login
  };

  return {
    control,
    errors,
    handleSubmit,
    isError,
    isLoading: isLoadingLogin || isLoadingMe,
    isValid,
    onSubmit
  };
};
