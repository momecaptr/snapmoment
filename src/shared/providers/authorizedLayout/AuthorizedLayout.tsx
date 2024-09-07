import React, { PropsWithChildren, ReactElement } from 'react';

import StoreProvider from '@/myApp/StoreProvider';
import { Header, SideBar } from '@/widget';
import { NextPage } from 'next';

import s from './AuthorizedLayout.module.scss';

/**
 * Layout for authorized users.
 */
export const AuthorizedLayout: NextPage<PropsWithChildren> = (props) => {
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

/**
 * Layout for authorized users.
 */
export const getAuthorizedLayout = (page: ReactElement) => {
  return (
    <StoreProvider>
      <AuthorizedLayout>{page}</AuthorizedLayout>
    </StoreProvider>
  );
};
