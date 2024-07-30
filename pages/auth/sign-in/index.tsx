import React from 'react';

import { SignIn } from '@/pagesComponents';
import { getAuthLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <SignIn />
    </>
  );
}

Page.getLayout = getAuthLayout;
