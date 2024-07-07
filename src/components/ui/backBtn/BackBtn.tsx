'use client';
import React, { ReactNode, memo } from 'react';
// import { Link } from 'react-router-dom';

import s from './BackBtn.module.scss';
import ArrowBackOutline from '@/common/assets/components/ArrowBackOutline';
import { Button } from '../button/Button';

type Props = {
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  to: string;
};

export const BackBtn = memo(({ children, onClick, to }: Props) => {
  return (
    <Button as={'a'} className={s.backBtn} onClick={onClick} to={to}>
      <ArrowBackOutline className={s.backArrow} />
      {children}
    </Button>
  );
});
