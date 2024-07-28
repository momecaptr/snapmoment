import React, { ReactNode } from 'react';

import { useMeQuery } from '@/shared/api';
import { Header, SideBar } from '@/widget';
import { clsx } from 'clsx';

import s from './PageLayout.module.scss';

type Props = {
  children: ReactNode;
};

export const PageLayout = (props: Props) => {
  const { children } = props;

  const { data: me, isFetching, isSuccess } = useMeQuery();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  console.log({ me });

  return (
    <main className={clsx(me ? s.layout : s.publicLayout)}>
      <div className={s.header}>
        <Header isAuthorized={!!me} />
      </div>
      {isSuccess && (
        <div className={s.sidebar}>
          <SideBar />
        </div>
      )}
      <div className={s.content}>{children}</div>
    </main>
  );
};
