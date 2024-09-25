import React, { PropsWithChildren, ReactElement } from 'react';

import StoreProvider from '@/myApp/StoreProvider';
import { Header } from '@/widget';
import { NextPage } from 'next';

import s from './NonAuthorizedLayout.module.scss';

/**
 * Layout for non-authorized users.
 */
export const NonAuthorizedLayout: NextPage<PropsWithChildren> = (props) => {
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

/**
 * Layout for non-authorized users.
 */
export const getNonAuthorizedLayout = (page: ReactElement) => {
  return (
    <StoreProvider>
      <NonAuthorizedLayout>{page}</NonAuthorizedLayout>
    </StoreProvider>
  );
};
