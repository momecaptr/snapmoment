import { useForm } from 'react-hook-form';

import { useAlert } from '@/entities';
import { SignUpSchemaType, signUpSchema } from '@/features';
import { QueryError } from '@/myApp/api/api.types';
import { useRegistrationMutation } from '@/myApp/api/snapmomentAPI';
import { zodResolver } from '@hookform/resolvers/zod';

export const useSignUpForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignUpSchemaType>({
    mode: 'onChange',
    /*mode: 'onBlur',*/
    resolver: zodResolver(signUpSchema)
  });

  const { errorAlert, successAlert } = useAlert();

  const [register] = useRegistrationMutation();
  const onSubmit = async (data: SignUpSchemaType) => {
    const res = await register({ email: data.email, password: data.password, userName: data.username });

    console.log({ e: res.error });
    try {
      if ('data' in res) {
        successAlert({ message: `We have sent a link to confirm your email to ${data.email}` });
      } else {
        const err = res.error as QueryError;

        console.log(err.messages[0]);
        errorAlert({ message: `Error - ${err.messages[0].message || 'Unknown error'}` });
        // errorAlert({ message: 'Error - Unknown error' });
      }
    } catch (e) {
      errorAlert({ message: 'An unexpected error occurred. Please try again later.' });
    }
  };

  return {
    control,
    errors,
    handleSubmit,
    isValid,
    onSubmit
    // registerMeAlert
  };
};
