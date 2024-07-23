import { useForm } from 'react-hook-form';

import { useAlert } from '@/entities';
import { SignUpSchemaType, signUpSchema } from '@/features';
import { useRegistrationMutation } from '@/myApp/api/snapmomentAPI';
import { zodResolver } from '@hookform/resolvers/zod';

export const useSignUpForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignUpSchemaType>({
    /*mode: 'onBlur',*/
    resolver: zodResolver(signUpSchema)
  });

  const { errorAlert, successAlert } = useAlert();

  const [register] = useRegistrationMutation();
  const onSubmit = async (data: SignUpSchemaType) => {
    const res = await register({ email: data.email, password: data.password, userName: data.username });

    if ('data' in res) {
      successAlert({ message: 'We sent you confirmation shit' });
    } else {
      errorAlert({ message: 'Error - you are dumb' });
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
