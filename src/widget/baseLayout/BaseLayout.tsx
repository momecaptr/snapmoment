import React, { ReactNode } from 'react';

import { Header, SideBar } from '@/widget';

import s from './BaseLayout.module.scss';

type Props = {
  children: ReactNode;
};
export const BaseLayout = (props: Props) => {
  const { children } = props;

  return (
    <div className={s.layout}>
      <div className={s.header}>
        <Header isAuthorized={false} />
      </div>
      <div className={s.sidebar}>
        <SideBar />
      </div>
      <div className={s.content}>{children}</div>
    </div>
  );
};
