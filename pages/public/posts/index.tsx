import React from 'react';

import { Posts } from '@/pagesComponents/posts/Posts';
import { getAuthLayout } from '@/shared/providers';

export default function Page() {
  return (
    <>
      <Posts />
    </>
  );
}

Page.getLayout = getAuthLayout;
