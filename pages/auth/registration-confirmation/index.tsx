import React from 'react';

import { Congratulations, useConfirmRegistration } from '@/pagesComponents';
import { ResendVerificationLink } from '@/pagesComponents/resendVerificationLink/ResendVerificationLink';

export default function Page() {
  const { isError, isSuccess, showLoading } = useConfirmRegistration();

  if (showLoading) {
    return <div>Loading...</div>;
  }

  if (isSuccess) {
    return <Congratulations />;
  }

  if (isError) {
    return <ResendVerificationLink />;
  }
}
