import { useCallback, useEffect } from 'react';

import { useCheckRecoveryCodeMutation } from '@/shared/api/auth/authApi';
import { useCustomToast } from '@/shared/lib';
import { useRouter } from 'next/router';

export const useCheckRecoveryCode = () => {
  const router = useRouter();
  const [checkCode, { isError, isLoading }] = useCheckRecoveryCodeMutation();
  const { code, email } = router.query;
  const { showToast } = useCustomToast();

  const checkCodeHandler = useCallback(async () => {
    if (!code) {
      showToast({ message: 'No code found in query params', type: 'success' });

      return;
    }

    try {
      const res = await checkCode({ recoveryCode: String(code) }).unwrap();

      if (res?.email) {
        await router.replace(`/auth/create-new-password?code=${code}`);
      }
    } catch (e) {
      await router.replace(`/auth/recovery-code-failed?email=${email}`);
      showToast({ message: 'There was an error verifying your recovery code. Please try again.', type: 'error' });
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
