import React from 'react';

import { Button } from '@/shared/button/Button';
import PhotoProfile from '@/shared/photoProfile/PhotoProfile';

import s from './ChangePhoto.module.scss';
const ChangePhoto = () => {
  return (
    <div className={s.box}>
      <PhotoProfile />
      <Button className={s.butoon} variant={'outlined'}>
        Add a Profile Photo
      </Button>
    </div>
  );
};

export default ChangePhoto;
