import React from 'react';

import { SignUp } from '@/pagesComponents';
import { getAuthLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      {/*<AddProfilePhotoModal />*/}
      <SignUp />
    </>
  );
}
Page.getLayout = getAuthLayout;
