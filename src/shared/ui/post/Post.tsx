import React from 'react';

import { clsx } from 'clsx';

import s from './Post.module.scss';
type Props = {
  className?: string;
};
export const Post = (props: Props) => {
  const { className } = props;

  return <div className={clsx(s.box, className)}></div>;
};
