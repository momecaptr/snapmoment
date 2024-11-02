import { Button } from '@/shared/ui';
import Link from 'next/link';

import s from './AuthButtons.module.scss';

type Props = {
  pathname: string;
};

const ROUTES = {
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up'
};

export const AuthButtons = (props: Props) => {
  const { pathname } = props;
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
