import { useEffect, useState } from 'react';

import { useConfirmRegistrationMutation } from '@/shared/api';
import { useRouter } from 'next/router';

export const useConfirmRegistration = () => {
  const [confirmRegistration, { isError, isSuccess }] = useConfirmRegistrationMutation();
  const router = useRouter();
  const { query } = router;
  const code = query.code; // Доступ к параметру "code" из URL
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (code) {
      confirmRegistration({ confirmationCode: code as string }).finally(() => {
        setShowLoading(false);
      });
    }
  }, [code]);

  return {
    isError,
    isSuccess,
    showLoading
  };
};
