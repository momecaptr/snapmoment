import { ElementType, useState } from 'react';

import s from './MobileMenu.module.scss';

import { clsx } from 'clsx';
import Home from '@/common/assets/components/Home';
import PlusSquare from '@/common/assets/components/PlusSquare';
import MessageCircle from '@/common/assets/components/MessageCircle';
import SearchOutline from '@/common/assets/components/SearchOutline';
import Person from '@/common/assets/components/Person';
import { Button } from '@/components/ui/button/Button';

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
    { IconComponent: Person, path: 'profile', value: 'person' },
  ];

  return (
    <div className={s.container}>
      <div className={s.btns}>
        {links.map(({ IconComponent, path, value }) => (
          <Button as={'a'} className={s.btn} key={value} onClick={() => setActiveIcon(value)} to={`${path}`}>
            <IconComponent
              className={clsx(s.icon, { [s.active]: activeIcon === value }, value === 'search' && s.searchIcon)}
            />
          </Button>
        ))}
      </div>
    </div>
  );
};
