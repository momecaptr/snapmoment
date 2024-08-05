import React from 'react';

import PhotoStub from '@/../public/assets/components/PhotoStub';
import clsx from 'clsx';

import s from './PhotoProfile.module.scss';

type Props = {
  className?: string;
};
export const PhotoProfile = (props: Props) => {
  const { className } = props;

  return (
    <div className={clsx(s.boxPhoto, className)}>
      <PhotoStub height={48} width={48} />
    </div>
  );
};
