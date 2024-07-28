import React, { PropsWithChildren, ReactElement } from 'react';

import StoreProvider from '@/myApp/StoreProvider';
import { Header, SideBar } from '@/widget';
import { NextPage } from 'next';

import s from './BaseLayout.module.scss';

export const BaseLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <main className={s.layout}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.sidebar}>
        <SideBar />
      </div>
      <div className={s.content}>{children}</div>
    </main>
  );
};

export const getBaseLayout = (page: ReactElement) => {
  return (
    <StoreProvider>
      <BaseLayout>{page}</BaseLayout>
    </StoreProvider>
  );
};
