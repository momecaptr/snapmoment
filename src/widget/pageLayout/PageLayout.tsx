import React, { ReactNode } from 'react';

import { Header, SideBar } from '@/widget';

import s from './PageLayout.module.scss';

type Props = {
  children: ReactNode;
};

export const PageLayout = (props: Props) => {
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
