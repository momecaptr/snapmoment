import { useForm } from 'react-hook-form';

import { SignInSchemaType, signInSchema } from '@/features';
import { zodResolver } from '@hookform/resolvers/zod';

const useSignInForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignInSchemaType>({
    /*mode: 'onBlur',*/
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = (data: SignInSchemaType) => console.log(data);

  return {
    control,
    errors,
    handleSubmit,
    isValid,
    onSubmit
  };
};

export default useSignInForm;
