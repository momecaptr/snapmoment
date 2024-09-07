import React from 'react';

import { SignIn } from '@/pagesComponents';
import { getNonAuthorizedLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <SignIn />
    </>
  );
}

Page.getLayout = getNonAuthorizedLayout;
