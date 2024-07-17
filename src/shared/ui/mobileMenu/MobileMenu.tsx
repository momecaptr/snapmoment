'use client';
import { ElementType, useState } from 'react';

import Home from '@/../public/assets/components/Home';
import MessageCircle from '@/../public/assets/components/MessageCircle';
import Person from '@/../public/assets/components/Person';
import PlusSquare from '@/../public/assets/components/PlusSquare';
import SearchOutline from '@/../public/assets/components/SearchOutline';
import { Button } from '@/shared/ui';
import { clsx } from 'clsx';
import Link from 'next/link';

import s from './MobileMenu.module.scss';

type IconIconComponentProps = {
  IconComponent: ElementType;
  path: string;
  value: LinksValue;
};
type LinksValue = '' | 'home' | 'message' | 'person' | 'plus' | 'search';

export const MobileMenu = () => {
  const [activeIcon, setActiveIcon] = useState<LinksValue>('');
  // path заменить на реальные пути
  const links: IconIconComponentProps[] = [
    { IconComponent: Home, path: 'home', value: 'home' },
    { IconComponent: PlusSquare, path: 'add', value: 'plus' },
    { IconComponent: MessageCircle, path: 'messages', value: 'message' },
    { IconComponent: SearchOutline, path: 'search', value: 'search' },
    { IconComponent: Person, path: 'profile', value: 'person' }
  ];

  return (
    <div className={s.container}>
      <div className={s.btns}>
        {links.map(({ IconComponent, path, value }) => (
          <Button as={Link} className={s.btn} href={`${path}`} key={value} onClick={() => setActiveIcon(value)}>
            <IconComponent
              className={clsx(s.icon, { [s.active]: activeIcon === value }, value === 'search' && s.searchIcon)}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};
