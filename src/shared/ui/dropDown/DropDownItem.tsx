import React, { ReactNode } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

import s from './DropDownWrapper.module.scss';

import { DDButton } from './DropDownButton';

type DropDownItemProps = {
  handleOnClick?: () => void;
  href?: string;
  icon: ReactNode | StaticImageData | string;
  text: string;
};

export const DropDownItem = (props: DropDownItemProps) => {
  const { handleOnClick, href, icon, text } = props;
  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement | HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleOnClick?.();
    }
  };

  return (
    <DropdownMenu.Item className={s.DropdownMenuItem} asChild>
      {href ? (
        <Link className={s.Link} href={href} onKeyDown={handleKeyDown}>
          <DDButton handleOnClick={handleOnClick} icon={icon} text={text} />
        </Link>
      ) : (
        <div onKeyDown={handleKeyDown}>
          <DDButton handleOnClick={handleOnClick} icon={icon} text={text} />
        </div>
      )}
    </DropdownMenu.Item>
  );
};
