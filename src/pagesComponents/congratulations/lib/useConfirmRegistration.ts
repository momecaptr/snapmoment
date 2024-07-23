import { useEffect } from 'react';

import { useAlert } from '@/entities';
import { useConfirmRegistrationMutation } from '@/myApp/api/snapmomentAPI';
import { useRouter } from 'next/router';

export const useConfirmRegistration = () => {
  const [confirmRegistration] = useConfirmRegistrationMutation();
  const router = useRouter();
  const { query } = router;
  const code = query.code; // Доступ к параметру "code" из URL

  const { errorAlert, successAlert } = useAlert();

  useEffect(() => {
    const confirmFunction = async () => {
      if (code) {
        try {
          const res = await confirmRegistration({ confirmationCode: code as string });

          if ('data' in res) {
            successAlert({ message: 'Email was verified. Account was activated' });
          } else {
            errorAlert({
              message: 'Looks like the verification link has expired. Not to worry, we can send the link again'
            });
          }
        } catch (e) {
          errorAlert({ message: 'An unexpected error occurred. Please try again later.' });
        }
      }
    };

    confirmFunction().catch((err) => {
      console.error('An error occurred:', err);
    });
  }, [code]);
};
