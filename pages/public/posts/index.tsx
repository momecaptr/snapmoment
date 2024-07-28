import React from 'react';

import { Posts } from '@/pagesComponents/posts/Posts';
import { getBaseLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <Posts />
    </>
  );
}

Page.getLayout = getBaseLayout;
