import React, { PropsWithChildren, ReactElement } from 'react';

import { Header, SideBar } from '@/widget';
import { NextPage } from 'next';

import s from './PageLayout.module.scss';

export const PageLayout: NextPage<PropsWithChildren> = (props) => {
  const { children } = props;

  return (
    <main className={s.layout}>
      <div className={s.header}>
        <Header isAuthorized={false} />
      </div>
      <div className={s.sidebar}>
        <SideBar />
      </div>
      <div className={s.content}>{children}</div>
    </main>
  );
};

export const getLayout = (page: ReactElement) => {
  return <PageLayout>{page}</PageLayout>;
};
