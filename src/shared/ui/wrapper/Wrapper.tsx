import React from 'react';

import { clsx } from 'clsx';

import s from './Wrapper.module.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: 'box' | 'boxContent' | 'navBar' | 'withoutStyles';
};
export const Wrapper = (props: Props) => {
  const { children, className, variant = 'boxContent' } = props;

  return <div className={clsx(s[variant], className)}>{children}</div>;
};
