import { useState } from 'react';

import Home from '@/../public/assets/components/Home';
import MessageCircle from '@/../public/assets/components/MessageCircle';
import Person from '@/../public/assets/components/Person';
import PlusSquare from '@/../public/assets/components/PlusSquare';
import SearchOutline from '@/../public/assets/components/SearchOutline';
import { MobileMenu } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { StoryProps } from '@storybook/blocks';
import { Meta, StoryFn } from '@storybook/react';
import { clsx } from 'clsx';

import s from './MobileMenu.module.scss';

const meta = {
  component: MobileMenu,
  parameters: {
    layout: 'center'
  },
  tags: ['autodocs'],
  title: 'Components/MobileMenu'
} satisfies Meta<typeof MobileMenu>;

export default meta;

export const Default: StoryFn<StoryProps> = () => {
  const [activeIcon, setActiveIcon] = useState('');

  const links = [
    { IconComponent: Home, path: 'home', value: 'home' },
    { IconComponent: PlusSquare, path: 'add', value: 'plus' },
    { IconComponent: MessageCircle, path: 'messages', value: 'message' },
    { IconComponent: SearchOutline, path: 'search', value: 'search' },
    { IconComponent: Person, path: 'profile', value: 'person' }
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
