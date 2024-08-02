import { useCallback, useEffect } from 'react';

import { useCheckRecoveryCodeMutation } from '@/shared/api';
import { useRouter } from 'next/router';

export const useCheckRecoveryCode = () => {
  const router = useRouter();
  const [checkCode, { isError, isLoading }] = useCheckRecoveryCodeMutation();
  const { code, email } = router.query;
  // const { errorAlert } = useAlert();

  const checkCodeHandler = useCallback(async () => {
    if (!code) {
      console.log('No code found in query params');

      return;
    }

    try {
      const res = await checkCode({ recoveryCode: String(code) }).unwrap();

      if (res?.email) {
        await router.push(`/auth/create-new-password?code=${code}`);
      }
    } catch (e) {
      await router.push(`/auth/recovery-code-failed?email=${email}`);
      console.error('Error in checkCodeHandler:', e);
      // errorAlert({ message: 'There was an error verifying your recovery code. Please try again.' }); (!!! при использовании возникают зацикленные ошибки)
    }
  }, [code, email, checkCode, router]);

  useEffect(() => {
    checkCodeHandler();
  }, [checkCodeHandler]);

  return {
    isError,
    isLoading
  };
};
