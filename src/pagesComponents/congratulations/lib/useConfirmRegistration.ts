import { useEffect } from 'react';

import { useConfirmRegistrationMutation } from '@/shared/api/auth/authApi';
import { useRouter } from 'next/router';

export const useConfirmRegistration = () => {
  const [confirmRegistration, { isError, isLoading, isSuccess }] = useConfirmRegistrationMutation();
  const router = useRouter();
  const { query } = router;
  const code = query.code; // Доступ к параметру "code" из URL

  useEffect(() => {
    if (code) {
      confirmRegistration({ confirmationCode: code as string });
    }
  }, [code]);

  return {
    isError,
    isLoading,
    isSuccess
  };
};
