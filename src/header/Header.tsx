import React from 'react';

import { Outlinebell } from '@/common/assets/components';
import SnapMomentLogo from '@/common/assets/components/SnapMomentLogo';
import { Button } from '@/components/ui/button/Button';
import LocaleSwitcher from '@/lib/features/localeSwitcher/ui/LocaleSwitcher';

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
          {isAuthorized && (
            <div className={s.item}>
              <Outlinebell className={s.bell} />
            </div>
          )}
          <div className={s.item}>
            <LocaleSwitcher />
          </div>
          {!isAuthorized && (
            <Button className={s.item} variant={'outlined'}>
              Log in
            </Button>
          )}
          {!isAuthorized && <Button className={s.item}>Sign up</Button>}
        </div>
      </div>
    </div>
  );
};

export default Header;
