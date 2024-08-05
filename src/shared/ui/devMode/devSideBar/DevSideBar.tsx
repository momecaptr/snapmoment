import React, { ElementType } from 'react';

import ArrowIosForward from '@/../public/assets/components/ArrowIosForward';
import { Typography } from '@/shared/ui';
import Link from 'next/link';

import s from './DevSideBar.module.scss';

type MainLinksProps = {
  IconComponent: ElementType;
  name: MainLinksName;
  path: string;
  value: LinksValue;
};

type LinksValue =
  | ''
  | 'create-new-password'
  | 'favorites'
  | 'home'
  | 'logout'
  | 'message'
  | 'password-recovery'
  | 'plus'
  | 'privacy'
  | 'profile'
  | 'recovery-password'
  | 'search'
  | 'sign-in'
  | 'sign-up'
  | 'statistics'
  | 'terms';

type MainLinksName =
  | '404'
  | 'Create new password'
  | 'Create'
  | 'Favorites'
  | 'Home'
  | 'Log Out'
  | 'Messenger'
  | 'My Profile'
  | 'Password recovery'
  | 'Privacy'
  | 'Recovery Password'
  | 'Search'
  | 'Sign Up'
  | 'Sign in'
  | 'Statistics'
  | 'Terms';

export const DevSideBar = () => {
  const mainLinks: MainLinksProps[] = [
    { IconComponent: ArrowIosForward, name: 'Home', path: '/', value: 'home' },
    { IconComponent: ArrowIosForward, name: 'Create', path: '/auth/plus', value: 'plus' },
    { IconComponent: ArrowIosForward, name: 'My Profile', path: '/profile', value: 'profile' },
    { IconComponent: ArrowIosForward, name: 'Messenger', path: '/message', value: 'message' },
    { IconComponent: ArrowIosForward, name: 'Search', path: '/search', value: 'search' },
    { IconComponent: ArrowIosForward, name: 'Statistics', path: '/statistics', value: 'statistics' },
    { IconComponent: ArrowIosForward, name: 'Favorites', path: '/favorites', value: 'favorites' },
    { IconComponent: ArrowIosForward, name: 'Sign Up', path: '/auth/sign-up', value: 'sign-up' },
    { IconComponent: ArrowIosForward, name: 'Sign in', path: '/auth/sign-in', value: 'sign-in' },
    {
      IconComponent: ArrowIosForward,
      name: 'Create new password',
      path: '/auth/create-new-password',
      value: 'create-new-password'
    },
    {
      IconComponent: ArrowIosForward,
      name: 'Password recovery',
      path: '/auth/password-recovery',
      value: 'password-recovery'
    },
    {
      IconComponent: ArrowIosForward,
      name: 'Privacy',
      path: '/auth/privacy',
      value: 'privacy'
    },
    {
      IconComponent: ArrowIosForward,
      name: 'Terms',
      path: '/auth/terms',
      value: 'terms'
    },

    { IconComponent: ArrowIosForward, name: '404', path: '/404', value: '' }
  ];

  return (
    <>
      {mainLinks.map(({ IconComponent, name, path, value }) => (
        <Link className={s.sideBarBtn} href={path} key={value}>
          <IconComponent className={s.iconArrowRight} />
          <Typography as={'span'} className={s.sideBarBtnText} variant={'small_text'}>
            {name}
          </Typography>
        </Link>
      ))}
    </>
  );
};
