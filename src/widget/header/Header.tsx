import React from 'react';

import { Outlinebell } from '@/../public/assets/components';
import SnapMomentLogo from '@/../public/assets/components/SnapMomentLogo';
import { LocaleSwitcher } from '@/features';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './Header.module.scss';

export const Header = () => {
  const { data: me, isError, isFetching, isSuccess } = useMeQuery();
  const router = useRouter();
  const hasUrl = (url: string) => {
    return router.pathname.includes(url);
  };

  if (isFetching) {
    return <div>Loading... Header</div>;
  }

  const renderAuthButtons = () => {
    if (hasUrl('sign-up')) {
      return (
        <Button as={Link} className={s.item} href={'/auth/sign-in'} variant={'outlined'}>
          Sign in
        </Button>
      );
    }
    if (hasUrl('sign-in')) {
      return (
        <Button as={Link} className={s.item} href={'/auth/sign-up'}>
          Sign up
        </Button>
      );
    }

    return (
      <>
        <Button as={Link} className={s.item} href={'/auth/sign-in'} variant={'outlined'}>
          Sign in
        </Button>
        <Button as={Link} className={s.item} href={'/auth/sign-up'}>
          Sign up
        </Button>
      </>
    );
  };

  return (
    <div className={s.header}>
      <div className={s.wrapper}>
        <div className={s.logoWrapper}>
          <SnapMomentLogo className={s.logo} />
        </div>
        <div className={s.itemsWrapper}>
          {me && <Outlinebell className={s.bell} />}
          <LocaleSwitcher />
          {!me && renderAuthButtons()}
        </div>
      </div>
    </div>
  );
};
