import React from 'react';

import clsx from 'clsx';

import s from './PhotoProfileStab.module.scss';

type Props = {
  className?: string;
  height?: number;
  width?: number;
};
export const PhotoProfileStab = (props: Props) => {
  const { className, height, width } = props;

  return (
    <div className={clsx(className, s.boxPhoto)}>{/*<PhotoStub height={height || 48} width={width || 48} />*/}</div>
  );
};
