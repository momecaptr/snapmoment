import React from 'react';

import { Congratulations, useConfirmRegistration } from '@/pagesComponents';
import { ResendVerificationLink } from '@/pagesComponents/resendVerificationLink/ResendVerificationLink';
import { getNonAuthorizedLayout } from '@/shared/providers';

export default function Page() {
  const { isError, isLoading, isSuccess } = useConfirmRegistration();

  return getNonAuthorizedLayout(
    <>
      {isError && <ResendVerificationLink />}
      {isLoading && <div>Loading...</div>}
      {isSuccess && <Congratulations />}
    </>
  );

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  //
  // if (isSuccess) {
  //   return <Congratulations />;
  // }
  //
  // if (isError) {
  //   return <ResendVerificationLink />;
  // }
}

// Page.getLayout = getAuthLayout;
