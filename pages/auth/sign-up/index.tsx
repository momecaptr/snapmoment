import React from 'react';

import { SignUp } from '@/pagesComponents';
import { getNonAuthorizedLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      {/*<AddProfilePhotoModal />*/}
      <SignUp />
    </>
  );
}
Page.getLayout = getNonAuthorizedLayout;
