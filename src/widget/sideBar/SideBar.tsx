import { ElementType, useState } from 'react';

import Bookmark from '@/../public/assets/components/Bookmark';
import Home from '@/../public/assets/components/Home';
import LogOutOutline from '@/../public/assets/components/LogOutOutline';
import MessageCircle from '@/../public/assets/components/MessageCircle';
import Person from '@/../public/assets/components/Person';
import PlusSquare from '@/../public/assets/components/PlusSquare';
import SearchOutline from '@/../public/assets/components/SearchOutline';
import TrendingUp from '@/../public/assets/components/TrendingUp';
import { useLogoutMutation } from '@/myApp/api/inctagramApi';
import { Typography } from '@/shared/ui';
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

  const [setLogout] = useLogoutMutation();

  return (
    <div className={s.container}>
      <div className={s.btns}>
        {mainLinks.map(({ IconComponent, name, path, value }) => (
          <Link
            onClick={() => {
              setActiveIcon(value);
            }}
            className={s.btn}
            href={path}
            key={value}
          >
            <IconComponent
              className={clsx(s.icon, { [s.active]: activeIcon === value }, value === 'search' && s.searchIcon)}
            />
            {value === 'logout' ? (
              <Typography as={'span'} className={s.btnText} onClick={setLogout} variant={'medium_text_14'}>
                {name}
              </Typography>
            ) : (
              <Typography as={'span'} className={s.btnText} variant={'medium_text_14'}>
                {name}
              </Typography>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
