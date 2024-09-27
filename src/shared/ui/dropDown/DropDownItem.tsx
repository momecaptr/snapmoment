import React, { ReactElement, ReactNode } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { clsx } from 'clsx';
import Link from 'next/link';

import s from './DropDownWrapper.module.scss';

import { Button } from '../button/Button';
import { Typography } from '../typography/Typography';

type DropDownItemProps = {
  handleOnClick?: () => void;
  href?: string;
  icon: ReactNode | string;
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

type DropDownButtonProps = {
  handleOnClick?: () => void;
  icon: ReactNode | string;
  text: string;
};
export const DDButton = ({ handleOnClick, icon, text }: DropDownButtonProps) => {
  return (
    <Button className={clsx(s.button, s.noHover)} onClick={handleOnClick} variant={'outlined'}>
      {typeof icon === 'string' ? (
        // <ReactSVG className={s.DDButtonImg} src={icon} />
        <img alt={''} className={s.DDButtonImg} src={icon} />
      ) : (
        React.cloneElement(icon as ReactElement, {
          className: s.DDButtonImg
        })
      )}
      {/*<ReactSVG className={s.DDButtonImg} src={icon} />*/}
      <Typography className={s.dropdownText} variant={'small_text'}>
        {text}
      </Typography>
    </Button>
  );
};
