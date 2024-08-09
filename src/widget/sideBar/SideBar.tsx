import { ComponentProps, ElementType, useState } from 'react';

import Bookmark from '@/../public/assets/components/Bookmark';
import Home from '@/../public/assets/components/Home';
import LogOutOutline from '@/../public/assets/components/LogOutOutline';
import MessageCircle from '@/../public/assets/components/MessageCircle';
import Person from '@/../public/assets/components/Person';
import PlusSquare from '@/../public/assets/components/PlusSquare';
import SearchOutline from '@/../public/assets/components/SearchOutline';
import TrendingUp from '@/../public/assets/components/TrendingUp';
import { useLogoutMutation } from '@/shared/api/auth/authApi';
import { Button, Typography } from '@/shared/ui';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

import s from './SideBar.module.scss';

type MainLinksProps = {
  IconComponent: ElementType;
  name: MainLinksName;
  path: string;
  value: LinksValue;
};

type LinksValue =
  | ''
  | 'create'
  | 'favorites'
  | 'home'
  | 'logout'
  | 'message'
  | 'profile'
  | 'recovery-password'
  | 'search'
  | 'sign-in'
  | 'sign-up'
  | 'statistics';

type MainLinksName =
  | 'Create'
  | 'Favorites'
  | 'Home'
  | 'Log Out'
  | 'Messenger'
  | 'My Profile'
  | 'Recovery Password'
  | 'Search'
  | 'Statistics';

type Props = ComponentProps<'div'>;
export const SideBar = (props: Props) => {
  const [logout] = useLogoutMutation();
  const [activeIcon, setActiveIcon] = useState<LinksValue>('');
  const router = useRouter();

  const mainLinks: MainLinksProps[] = [
    { IconComponent: Home, name: 'Home', path: '/', value: 'home' },
    { IconComponent: PlusSquare, name: 'Create', path: '/auth/create', value: 'create' },
    { IconComponent: Person, name: 'My Profile', path: '/profile', value: 'profile' },
    { IconComponent: MessageCircle, name: 'Messenger', path: '/message', value: 'message' },
    { IconComponent: SearchOutline, name: 'Search', path: '/search', value: 'search' },
    { IconComponent: TrendingUp, name: 'Statistics', path: '/statistics', value: 'statistics' },
    { IconComponent: Bookmark, name: 'Favorites', path: '/favorites', value: 'favorites' }
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
        <Button
          onClick={(e) => {
            logout()
              .unwrap()
              .then(() => {
                router.push('/auth/sign-in');
              });
          }}
          className={s.btn}
          variant={'text'}
        >
          <LogOutOutline className={s.icon} />
          Log out
        </Button>
      </div>
    </div>
  );
};
