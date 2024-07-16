import React from 'react';

import { clsx } from 'clsx';

import s from './PhotoProfile.module.scss';

import PhootoStub from '../../../public/assets/components/PhootoStub';

type PhotoProfileProps = {
  className?: string;
  photo?: null | string;
};

const PhotoProfile = (props: PhotoProfileProps) => {
  const { className, photo } = props;

  return (
    <div>
      {photo ? (
        <img alt={'Фото профиля'} className={clsx(className, s.photo)} src={photo} />
      ) : (
        <div className={clsx(className, s.boxPhooto)}>
          <PhootoStub height={48} width={48} />
        </div>
      )}
    </div>
  );
};

export default PhotoProfile;
