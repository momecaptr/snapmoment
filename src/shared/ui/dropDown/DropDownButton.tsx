import React, { ReactElement, ReactNode } from 'react';

import { clsx } from 'clsx';
import { StaticImageData } from 'next/image';

import s from './DropDownWrapper.module.scss';

import { Button } from '../button/Button';
import { Typography } from '../typography/Typography';

type DropDownButtonProps = {
  handleOnClick?: () => void;
  icon: ReactNode | StaticImageData | string;
  text: string;
};

const isStaticImageData = (icon: ReactNode | StaticImageData | string): icon is StaticImageData => {
  return typeof icon !== 'string' && (icon as StaticImageData).src !== undefined;
};

export const DDButton = ({ handleOnClick, icon, text }: DropDownButtonProps) => {
  return (
    <Button className={clsx(s.button, s.noHover)} onClick={handleOnClick} variant={'outlined'}>
      {typeof icon === 'string' || isStaticImageData(icon) ? (
        // <ReactSVG className={s.DDButtonImg} src={icon} />
        <img
          alt={''}
          className={s.DDButtonImg}
          height={24}
          src={typeof icon === 'string' ? icon : icon?.src}
          width={24}
        />
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
