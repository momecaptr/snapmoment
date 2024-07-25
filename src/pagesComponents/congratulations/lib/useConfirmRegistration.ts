// import { useEffect } from 'react';
//
// import { useAlert } from '@/entities';
// import { useConfirmRegistrationMutation } from '@/shared/api';
// import { useRouter } from 'next/router';
//
// export const useConfirmRegistration = () => {
//   const [confirmRegistration] = useConfirmRegistrationMutation();
//   const router = useRouter();
//   const { query } = router;
//   const code = query.code; // Доступ к параметру "code" из URL
//
//   const { errorAlert, successAlert } = useAlert();
//
//   useEffect(() => {
//     const confirmFunction = async () => {
//       // ! Должна быть дополнительная логика, проверки существования пользователя в БазеДанных и если его нет, то логика ниже, но если есть, тогда отправлять пользователя на страницу: 1) Если линка рабочая, то на страницу login, 2) если не рабочая, то на страницу resend confirmation link
//       if (code) {
//         try {
//           const res = await confirmRegistration({ confirmationCode: code as string });
//
//           if ('data' in res) {
//             successAlert({ message: 'Email was verified. Account was activated' });
//           } else {
//             errorAlert({
//               message: 'Looks like the verification link has expired. Not to worry, we can send the link again'
//             });
//           }
//         } catch (e) {
//           errorAlert({ message: 'An unexpected error occurred. Please try again later.' });
//         }
//       }
//     };
//
//     confirmFunction().catch((err) => {
//       console.error('An error occurred:', err);
//     });
//   }, [code]);
// };

import { useEffect, useState } from 'react';

import { useConfirmRegistrationMutation } from '@/shared/api';
import { useRouter } from 'next/router';

export const useConfirmRegistration = () => {
  const [confirmRegistration, { isError, isLoading, isSuccess }] = useConfirmRegistrationMutation();
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
