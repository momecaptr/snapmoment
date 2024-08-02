import React from 'react';

import { CheckRecoveryCode } from '@/pagesComponents';
import { getAuthLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <CheckRecoveryCode />
    </>
  );
}

Page.getLayout = getAuthLayout;
