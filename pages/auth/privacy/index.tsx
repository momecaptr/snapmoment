import React from 'react';

import { getNonAuthorizedLayout } from '@/shared/providers';
import { Privacy } from '@/shared/ui';

export default function Page() {
  return (
    <>
      <Privacy title={'Privacy Policy'} />
    </>
  );
}
Page.getLayout = getNonAuthorizedLayout;
