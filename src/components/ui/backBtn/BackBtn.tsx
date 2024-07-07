'use client';
import React, { ReactNode, memo } from 'react';

import ArrowBackOutline from '@/common/assets/components/ArrowBackOutline';
import Link from 'next/link';

import s from './BackBtn.module.scss';

import { Button } from '../button/Button';

type Props = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  to: string;
};

export const BackBtn = memo(({ children, onClick, to }: Props) => {
  return (
    <Button as={Link} className={s.backBtn} href={to} onClick={onClick}>
      <ArrowBackOutline className={s.backArrow} />
      {children}
    </Button>
  );
});
