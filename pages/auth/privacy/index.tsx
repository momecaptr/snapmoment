import React from 'react';

import { getAuthLayout } from '@/shared/providers';
import { Privacy } from '@/shared/ui';

export default function Page() {
  return (
    <>
      <Privacy title={'Privacy Policy'} />
    </>
  );
}
Page.getLayout = getAuthLayout;
