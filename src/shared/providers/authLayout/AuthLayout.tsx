import React, { PropsWithChildren, ReactElement } from 'react';

import StoreProvider from '@/myApp/StoreProvider';
import { Header } from '@/widget';
import { NextPage } from 'next';

import s from './AuthLayout.module.scss';

export const AuthLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <main className={s.layout}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.content}>{children}</div>
    </main>
  );
};

export const getAuthLayout = (page: ReactElement) => {
  return (
    <StoreProvider>
      <AuthLayout>{page}</AuthLayout>
    </StoreProvider>
  );
};
