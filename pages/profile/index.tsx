import React from 'react';

import { Profile } from '@/pagesComponents/profile/Profile';
import { getBaseLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <Profile />
    </>
  );
}

Page.getLayout = getBaseLayout;
