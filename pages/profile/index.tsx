import React from 'react';

import { getAuthorizedLayout } from '@/shared/providers';
import { MyProfile } from '@/widget';

export default function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <MyProfile />
    </div>
  );
}

Page.getLayout = getAuthorizedLayout;
