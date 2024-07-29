import React from 'react';

import { Outlinebell } from '@/../public/assets/components';
import SnapMomentLogo from '@/../public/assets/components/SnapMomentLogo';
import { LocaleSwitcher } from '@/features';
import { useMeQuery } from '@/shared/api';
import { Button } from '@/shared/ui';
import { useRouter } from 'next/router';

import s from './Header.module.scss';

export const Header = () => {
  const { data: me, isError, isFetching, isSuccess } = useMeQuery();
  const router = useRouter();

  if (isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.header}>
      <div className={s.wrapper}>
        <div className={s.logoWrapper}>
          <SnapMomentLogo className={s.logo} />
        </div>
        <div className={s.itemsWrapper}>
          {me && <Outlinebell className={s.bell} />}
          <LocaleSwitcher />
          {!me && (
            <>
              {router.pathname.includes('sign-up') && (
                <Button className={s.item} variant={'outlined'}>
                  Sign in
                </Button>
              )}
              {router.pathname.includes('sign-in') && <Button className={s.item}>Sign up</Button>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
