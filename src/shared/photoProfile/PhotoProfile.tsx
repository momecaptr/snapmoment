import React from 'react';

import clsx from 'clsx';

import s from './PhotoProfile.module.scss';

import PhotoStub from '../../../public/assets/components/PhootoStub';

type Props = {
  className?: string;
};
const PhotoProfile = (props: Props) => {
  const { className } = props;

  return (
    <div className={clsx(className, s.boxPhoto)}>
      <PhotoStub height={48} width={48} />
    </div>
  );
};

export default PhotoProfile;
