import { useState } from 'react';

import Home from '@/common/assets/components/Home';
import MessageCircle from '@/common/assets/components/MessageCircle';
import Person from '@/common/assets/components/Person';
import PlusSquare from '@/common/assets/components/PlusSquare';
import SearchOutline from '@/common/assets/components/SearchOutline';
import { MobileMenu } from '@/components/ui/mobileMenu/MobileMenu';
import { StoryProps } from '@storybook/blocks';
import { Meta, StoryFn } from '@storybook/react';
import { clsx } from 'clsx';

import s from './MobileMenu.module.scss';

import { Button } from '../button/Button';

const meta = {
  component: MobileMenu,
  parameters: {
    layout: 'center',
  },
  tags: ['autodocs'],
  title: 'Components/MobileMenu',
} satisfies Meta<typeof MobileMenu>;

export default meta;

export const Default: StoryFn<StoryProps> = () => {
  const [activeIcon, setActiveIcon] = useState('');

  const links = [
    { IconComponent: Home, path: 'home', value: 'home' },
    { IconComponent: PlusSquare, path: 'add', value: 'plus' },
    { IconComponent: MessageCircle, path: 'messages', value: 'message' },
    { IconComponent: SearchOutline, path: 'search', value: 'search' },
    { IconComponent: Person, path: 'profile', value: 'person' },
  ];

  return (
    <div className={s.container}>
      <div className={s.btns}>
        {links.map(({ IconComponent, value /*path*/ }) => (
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
          </Button>
        ))}
      </div>
    </div>
  );
};
