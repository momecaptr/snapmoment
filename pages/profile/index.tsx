import React from 'react';

import { getBaseLayout } from '@/shared/providers';
import MyProfile from '@/widget/myProfile/MyProfile';

export default function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <MyProfile />
    </div>
  );
}

Page.getLayout = getBaseLayout;
