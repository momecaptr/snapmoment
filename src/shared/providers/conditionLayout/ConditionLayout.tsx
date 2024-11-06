import React, { PropsWithChildren, ReactElement } from 'react';

import StoreProvider from '@/myApp/StoreProvider';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { Header, SideBar } from '@/widget';
import { NextPage } from 'next';

import s from '@/shared/providers/authorizedLayout/AuthorizedLayout.module.scss';

/**
 * Conditional render Layout. With Me Query
 */
export const ConditionLayout: NextPage<PropsWithChildren> = (props) => {
  const { data: me } = useMeQuery();
  // {me ? (
  //   <AuthorizedLayout>{props.children}</AuthorizedLayout>
  // ) : (
  //   <NonAuthorizedLayout>{props.children}</NonAuthorizedLayout>
  // )}

  console.log('ZNEN', me);

  return (
    <>
      <main className={s.layout}>
        <div className={s.header}>
          <Header />
        </div>
        {me && (
          <div className={s.sidebar}>
            <SideBar />
          </div>
        )}
        <div className={s.content}>{props.children}</div>
      </main>
    </>
  );
};

/**
 * Conditional render Layout. With Me Query.
 * If Me === true => authorizedLayout
 */
export const getConditionLayout = (page: ReactElement) => {
  return (
    <StoreProvider>
      <ConditionLayout>{page}</ConditionLayout>
    </StoreProvider>
  );
};
