import React from 'react';

import { clsx } from 'clsx';

import s from './PhotoProfile.module.scss';

import PhootoStub from '../../../public/assets/components/PhootoStub';
type PhotoProfileProps = {
  className?: string;
};
const PhotoProfile = (props: PhotoProfileProps) => {
  const { className } = props;

  return (
    <div className={clsx(className, s.boxPhooto)}>
      <PhootoStub height={48} width={48} />
    </div>
  );
};

export default PhotoProfile;
