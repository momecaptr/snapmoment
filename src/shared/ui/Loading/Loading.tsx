import React from 'react';

import { clsx } from 'clsx';

import s from './Loading.module.scss'; // Подключаем CSS
type Props = {
  className?: string;
};
export const Loading = (props: Props) => {
  const { className } = props;

  return (
    <div className={clsx(s.loadingContainer, className)}>
      <div className={s.loadingDot}></div>
      <div className={s.loadingDot}></div>
      <div className={s.loadingDot}></div>
    </div>
  );
};
