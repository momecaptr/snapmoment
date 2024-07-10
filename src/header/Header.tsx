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
        <SnapMomentLogo className={s.logo} />
        <div className={s.items}>
          {isAuthorized && (
            <div className={s.bell}>
              <Outlinebell />
            </div>
          )}
          <LocaleSwitcher />
          {!isAuthorized && <Button variant={'outlined'}>Log in</Button>}
          {!isAuthorized && <Button>Sign up</Button>}
        </div>
      </div>
    </div>
  );
};

export default Header;
