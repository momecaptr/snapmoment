import { useEffect } from 'react';

import { useCheckRecoveryCodeMutation } from '@/shared/api';
import { useRouter } from 'next/router';

const CheckRecoveryCode = () => {
  const router = useRouter();
  const [checkCode] = useCheckRecoveryCodeMutation();
  const { code, email } = router.query;

  useEffect(() => {
    const checkCodeHandler = async () => {
      if (code) {
        try {
          const res = await checkCode({ recoveryCode: String(code) });

          console.log({ code, email, res });

          if (res.data) {
            localStorage.setItem('recoveryCode', String(code));
            router.push('/auth/create-new-password');
          } else {
            localStorage.setItem('email', String(email));
            router.push('/auth/recovery-code-failed');
          }
        } catch (e) {
          console.log(e);
        }
      }
    };

    checkCodeHandler();
  }, [code]);

  return <div>Loading...</div>;
};

export default CheckRecoveryCode;
