'use client';
import { ElementType, useState } from 'react';

import Bookmark from '@/common/assets/components/Bookmark';
import Home from '@/common/assets/components/Home';
import LogOutOutline from '@/common/assets/components/LogOutOutline';
import MessageCircle from '@/common/assets/components/MessageCircle';
import Person from '@/common/assets/components/Person';
import PlusSquare from '@/common/assets/components/PlusSquare';
import SearchOutline from '@/common/assets/components/SearchOutline';
import TrendingUp from '@/common/assets/components/TrendingUp';
import { Typography } from '@/components/ui/typography/Typography';
import clsx from 'clsx';
import Link from 'next/link';

import s from './SideBar.module.scss';

type MainLinksProps = {
  IconComponent: ElementType;
  name: MainLinksName;
  path: string;
  value: LinksValue;
};

type LinksValue =
  | ''
  | 'favorites'
  | 'forgot-password'
  | 'home'
  | 'logout'
  | 'message'
  | 'person'
  | 'plus'
  | 'search'
  | 'sign-in'
  | 'sign-up'
  | 'statistics';

type MainLinksName =
  | 'Create'
  | 'Favorites'
  | 'Forgot Password'
  | 'Home'
  | 'Log Out'
  | 'Messenger'
  | 'My Profile'
  | 'Search'
  | 'Sign Up'
  | 'Sign in'
  | 'Statistics';

export const SideBar = () => {
  const [activeIcon, setActiveIcon] = useState<LinksValue>('');

  const mainLinks: MainLinksProps[] = [
    { IconComponent: Home, name: 'Home', path: '/', value: 'home' },
    { IconComponent: PlusSquare, name: 'Sign in', path: '/sign-in', value: 'plus' },
    { IconComponent: Person, name: 'Forgot Password', path: '/forgot-password', value: 'person' },
    { IconComponent: MessageCircle, name: 'Sign Up', path: '/sign-up', value: 'message' },
    { IconComponent: SearchOutline, name: 'Search', path: '/search', value: 'search' },
    { IconComponent: TrendingUp, name: 'Statistics', path: '/statistics', value: 'statistics' },
    { IconComponent: Bookmark, name: 'Favorites', path: '/favorites', value: 'favorites' },
    { IconComponent: LogOutOutline, name: 'Log Out', path: '/logout', value: 'logout' }
  ];

  return (
    <div className={s.container}>
      <div className={s.btns}>
        {mainLinks.map(({ IconComponent, name, path, value }) => (
          <Link className={s.btn} href={path} key={value} onClick={() => setActiveIcon(value)}>
            <IconComponent
              className={clsx(s.icon, { [s.active]: activeIcon === value }, value === 'search' && s.searchIcon)}
            />
            <Typography as={'span'} className={s.btnText} variant={'medium_text_14'}>
              {name}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};
