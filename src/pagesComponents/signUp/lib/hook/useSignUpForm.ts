import { useForm } from 'react-hook-form';

import { useAlert } from '@/entities';
import { getRegistrationData, setRegistrationData } from '@/features/reSendConfirmationLink/model/resendVerifySlice';
import { BaseResponseType, useRegistrationMutation } from '@/shared/api';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
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

  const { errorAlert, successAlert } = useAlert();
  const dispatch = useAppDispatch();
  const toResend = useAppSelector(getRegistrationData);

  const [register] = useRegistrationMutation();
  const onSubmit = async (data: SignUpSchemaType) => {
    const res = await register({ email: data.email, password: data.password, userName: data.username });

    dispatch(setRegistrationData(data));
    console.log({ data, toResend });
    try {
      if ('data' in res) {
        successAlert({ message: `We have sent a link to confirm your email to ${data.email}` });
      } else {
        const err = res.error as BaseResponseType;

        errorAlert({ message: `Error - ${err.messages[0].message || 'unknown issue'}` });
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
  };
};
