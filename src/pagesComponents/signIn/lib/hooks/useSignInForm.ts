import { useForm } from 'react-hook-form';

import { useAlert } from '@/entities';
import { SignInSchemaType, signInSchema } from '@/features';
import { useLoginMutation } from '@/myApp/api/inctagramApi';
import { useLazyGetUserProfileQuery } from '@/pagesComponents/statistics/ui/profile/inctagramProfileApi';
import { zodResolver } from '@hookform/resolvers/zod';
import Router from 'next/router';

export const useSignInForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignInSchemaType>({
    defaultValues: { email: 'cayaji2321@orsbap.com', password: 'Ex4mple!' },
    /*mode: 'onBlur',*/
    resolver: zodResolver(signInSchema)
  });

  const [login, { isLoading }] = useLoginMutation();
  const [getProfile] = useLazyGetUserProfileQuery();
  const { errorAlert, successAlert } = useAlert();

  const onSubmit = async (data: SignInSchemaType) => {
    const res = await login({ email: data.email, password: data.password })
      .unwrap()
      .then(async () => {
        const { data } = await getProfile();

        if (!data) {
          return;
        }

        // try {
        //   if ('data' in res) {
        //     successAlert({ message: `We have sent a link to confirm your email to ${data.email}` });
        //   } else {
        //     const err = res.error as any;
        //
        //     errorAlert({ message: `Error - ${err.messages[0].message || 'unknown issue'}` });
        //   }
        // } catch (e) {
        //   errorAlert({ message: 'An unexpected error occurred. Please try again later.' });
        // }

        void Router.push(`/profile/${data?.id}`);
      });
  };

  return {
    control,
    errors,
    handleSubmit,
    isLoading,
    isValid,
    onSubmit
  };
};
