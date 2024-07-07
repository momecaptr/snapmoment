import { useState } from 'react';

import Bookmark from '@/common/assets/components/Bookmark';
import Home from '@/common/assets/components/Home';
import LogOutOutline from '@/common/assets/components/LogOutOutline';
import MessageCircle from '@/common/assets/components/MessageCircle';
import Person from '@/common/assets/components/Person';
import PlusSquare from '@/common/assets/components/PlusSquare';
import SearchOutline from '@/common/assets/components/SearchOutline';
import TrendingUp from '@/common/assets/components/TrendingUp';
import { SideBar } from '@/components/ui/sideBar/SideBar';
import { StoryProps } from '@storybook/blocks';
import { Meta, StoryFn } from '@storybook/react';
import clsx from 'clsx';

import s from './SideBar.module.scss';

import { Button } from '../button/Button';

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
        {mainLinks.map(({ IconComponent, name, value /*path*/ }) => (
          <Button
            // добавить  as={Link}
            className={s.btn}
            key={value}
            onClick={() => setActiveIcon(value)}
            // to={`${path}`}
          >
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
