import { useState } from 'react';

import Bookmark from '@/../public/assets/components/Bookmark';
import Home from '@/../public/assets/components/Home';
import LogOutOutline from '@/../public/assets/components/LogOutOutline';
import MessageCircle from '@/../public/assets/components/MessageCircle';
import Person from '@/../public/assets/components/Person';
import PlusSquare from '@/../public/assets/components/PlusSquare';
import SearchOutline from '@/../public/assets/components/SearchOutline';
import TrendingUp from '@/../public/assets/components/TrendingUp';
import { Typography } from '@/shared/ui';
import { SideBar } from '@/widget';
import { StoryProps } from '@storybook/blocks';
import { Meta, StoryFn } from '@storybook/react';
import clsx from 'clsx';
import Link from 'next/link';

import s from './SideBar.module.scss';

const meta = {
  component: SideBar,
  parameters: {
    layout: 'center'
  },
  tags: ['autodocs'],
  title: 'Components/SideBar'
} satisfies Meta<typeof SideBar>;

export default meta;

export const Default: StoryFn<StoryProps> = () => {
  const [activeIcon, setActiveIcon] = useState('');
  // path заменить на реальные пути
  const mainLinks = [
    { IconComponent: Home, name: 'Home', path: 'home', value: 'home' },
    { IconComponent: PlusSquare, name: 'Create', path: 'add', value: 'plus' },
    { IconComponent: Person, name: 'My Profile', path: 'profile', value: 'person' },
    { IconComponent: MessageCircle, name: 'Messenger', path: 'messages', value: 'message' },
    { IconComponent: SearchOutline, name: 'Search', path: 'search', value: 'search' },
    {
      IconComponent: TrendingUp,
      name: 'Statistics',
      path: 'statistics',
      value: 'statistics'
    },
    { IconComponent: Bookmark, name: 'Favorites', path: 'favorites', value: 'favorites' },
    { IconComponent: LogOutOutline, name: 'Log Out', path: 'logout', value: 'logout' }
  ];

  return (
    <div className={s.container}>
      <div className={s.btns}>
        {mainLinks.map(({ IconComponent, name, path, value }) => (
          <Link className={s.btn} href={`${path}`} key={value} onClick={() => setActiveIcon(value)}>
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
