import React from 'react';

import { CheckRecoveryCode } from '@/pagesComponents';
import { getNonAuthorizedLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <CheckRecoveryCode />
    </>
  );
}

Page.getLayout = getNonAuthorizedLayout;
