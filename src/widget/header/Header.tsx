import React from 'react';

import { UserNotifications } from '@/entities';
import { LocaleSwitcher } from '@/features';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { AppLogo, AuthButtons, Loading, Wrapper } from '@/shared/ui';
import { useRouter } from 'next/router';

import s from './Header.module.scss';

export const Header = () => {
  const { data: me, isLoading } = useMeQuery();
  const { pathname } = useRouter();

  if (isLoading) {
    // todo: Сделать маленькую крутилку или скелетон
    return <Loading />;
  }

  return (
    <header className={s.header}>
      <Wrapper className={s.wrapper} variant={'box'}>
        <AppLogo />
        <div className={s.itemsWrapper}>
          {me ? <UserNotifications /> : null}
          <LocaleSwitcher />
          {!me ? <AuthButtons pathname={pathname} /> : null}
        </div>
      </Wrapper>
    </header>
  );
};
