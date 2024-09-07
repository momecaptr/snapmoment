import React from 'react';

import { GeneralInfo } from '@/pagesComponents';
import { getAuthorizedLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <GeneralInfo />
    </>
  );
}

Page.getLayout = getAuthorizedLayout;
