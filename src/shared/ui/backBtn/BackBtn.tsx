import React, { ReactNode, memo } from 'react';

import ArrowBackOutline from '@/../public/assets/components/ArrowBackOutline';
import { Button } from '@/shared/ui';
import Link from 'next/link';

import s from './BackBtn.module.scss';

type Props = {
  children: ReactNode;
  href: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export const BackBtn = memo(({ children, href, onClick }: Props) => {
  return (
    <Button as={Link} className={s.backBtn} href={href} onClick={onClick} variant={'text'}>
      <ArrowBackOutline className={s.backArrow} />
      {children}
    </Button>
  );
});
