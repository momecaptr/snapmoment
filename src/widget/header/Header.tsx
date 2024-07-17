import React from 'react';

import { Outlinebell } from '@/../public/assets/components';
import SnapMomentLogo from '@/../public/assets/components/SnapMomentLogo';
import LocaleSwitcher from '@/features/localeSwitcher/ui/LocaleSwitcher';
import { Button } from '@/shared/ui';

import s from './Header.module.scss';

type HeaderProps = {
  isAuthorized: boolean;
};
const Header = (props: HeaderProps) => {
  const { isAuthorized } = props;

  return (
    <div className={s.header}>
      <div className={s.wrapper}>
        <div className={s.logoWrapper}>
          <SnapMomentLogo className={s.logo} />
        </div>
        <div className={s.itemsWrapper}>
          {isAuthorized && <Outlinebell className={s.bell} />}
          <LocaleSwitcher />
          {!isAuthorized && (
            <>
              <Button className={s.item} variant={'text'}>
                Log in
              </Button>
              <Button className={s.item}>Sign up</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
