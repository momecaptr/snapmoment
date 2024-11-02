import React from 'react';

import SnapMomentLogo from '@/../public/assets/components/SnapMomentLogo';
import { UserNotifications } from '@/entities';
import { LocaleSwitcher } from '@/features';
import { useMeQuery } from '@/shared/api/auth/authApi';
import { Button } from '@/shared/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './Header.module.scss';

const ROUTES = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up'
};

// Компонент кнопок для аутентификации
const AuthButtons = ({ pathname }: { pathname: string }) => {
  const isSignUpPage = pathname.includes('sign-up');
  const isSignInPage = pathname.includes('sign-in');

  return (
    <>
      {!isSignUpPage && (
        <Button as={Link} className={s.item} href={ROUTES.SIGN_IN} variant={'outlined'}>
          Sign in
        </Button>
      )}
      {!isSignInPage && (
        <Button as={Link} className={s.item} href={ROUTES.SIGN_UP}>
          Sign up
        </Button>
      )}
    </>
  );
};

// Компонент логотипа
const Logo = () => (
  <Link className={s.logoWrapper} href={'/'}>
    <SnapMomentLogo className={s.logo} />
  </Link>
);

// Компонент header (widget)
export const Header = () => {
  const { data: me } = useMeQuery();
  const { pathname } = useRouter();

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <Logo />
        <div className={s.itemsWrapper}>
          {me && <UserNotifications />}
          <LocaleSwitcher />
          {!me && <AuthButtons pathname={pathname} />}
        </div>
      </div>
    </header>
  );
};
