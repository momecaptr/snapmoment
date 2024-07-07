import { ElementType, useState } from 'react';

import Bookmark from '@/common/assets/components/Bookmark';
import Home from '@/common/assets/components/Home';
import LogOutOutline from '@/common/assets/components/LogOutOutline';
import MessageCircle from '@/common/assets/components/MessageCircle';
import Person from '@/common/assets/components/Person';
import PlusSquare from '@/common/assets/components/PlusSquare';
import SearchOutline from '@/common/assets/components/SearchOutline';
import TrendingUp from '@/common/assets/components/TrendingUp';
import clsx from 'clsx';
import Link from 'next/link';

import s from './SideBar.module.scss';

import { Button } from '../button/Button';

type MainLinksProps = {
  IconComponent: ElementType;
  name: MainLinksName;
  path: string;
  value: LinksValue;
};

type LinksValue = '' | 'favorites' | 'home' | 'logout' | 'message' | 'person' | 'plus' | 'search' | 'statistics';
type MainLinksName = 'Create' | 'Favorites' | 'Home' | 'Log Out' | 'Messenger' | 'My Profile' | 'Search' | 'Statistics';
export const SideBar = () => {
  const [activeIcon, setActiveIcon] = useState<LinksValue>('');
  // path заменить на реальные пути
  const mainLinks: MainLinksProps[] = [
    { IconComponent: Home, name: 'Home', path: 'home', value: 'home' },
    { IconComponent: PlusSquare, name: 'Create', path: 'add', value: 'plus' },
    { IconComponent: Person, name: 'My Profile', path: 'profile', value: 'person' },
    { IconComponent: MessageCircle, name: 'Messenger', path: 'messages', value: 'message' },
    { IconComponent: SearchOutline, name: 'Search', path: 'search', value: 'search' },
    {
      IconComponent: TrendingUp,
      name: 'Statistics',
      path: 'statistics',
      value: 'statistics',
    },
    { IconComponent: Bookmark, name: 'Favorites', path: 'favorites', value: 'favorites' },
    { IconComponent: LogOutOutline, name: 'Log Out', path: 'logout', value: 'logout' },
  ];

  return (
    <div className={s.container}>
      <div className={s.btns}>
        {mainLinks.map(({ IconComponent, name, path, value }) => (
          <Button as={Link} className={s.btn} href={`${path}`} key={value} onClick={() => setActiveIcon(value)}>
            <IconComponent
              className={clsx(s.icon, { [s.active]: activeIcon === value }, value === 'search' && s.searchIcon)}
            />
            {/*заменить span на Typography*/}
            <span>{name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
