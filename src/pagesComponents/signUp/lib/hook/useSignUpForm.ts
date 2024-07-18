import { useForm } from 'react-hook-form';

import { SignUpSchemaType, signUpSchema } from '@/features';
import { zodResolver } from '@hookform/resolvers/zod';

const useSignUpForm = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit
  } = useForm<SignUpSchemaType>({
    /*mode: 'onBlur',*/
    resolver: zodResolver(signUpSchema)
  });

  const onSubmit = (data: SignUpSchemaType) => console.log(data);

  return {
    control,
    errors,
    handleSubmit,
    isValid,
    onSubmit
  };
};

export default useSignUpForm;
