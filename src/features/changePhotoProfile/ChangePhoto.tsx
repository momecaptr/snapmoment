import React from 'react';

import PhotoProfile from '@/shared/photoProfile/PhotoProfile';
import { Button } from '@/shared/ui';

import s from './ChangePhoto.module.scss';
export const ChangePhoto = () => {
  return (
    <div className={s.box}>
      <PhotoProfile />
      <Button className={s.button} variant={'outlined'}>
        Add a Profile Photo
      </Button>
    </div>
  );
};
