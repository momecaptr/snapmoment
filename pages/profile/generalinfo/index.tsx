import React from 'react';

import { GeneralInfo } from '@/pagesComponents';
import { getBaseLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <GeneralInfo />
    </>
  );
}

Page.getLayout = getBaseLayout;
