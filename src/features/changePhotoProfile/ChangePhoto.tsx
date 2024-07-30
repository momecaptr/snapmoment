import React from 'react';

import { Button, PhotoProfile } from '@/shared/ui';

import s from './ChangePhoto.module.scss';
export const ChangePhoto = () => {
  return (
    <div className={s.box}>
      <div className={s.photo}>
        <PhotoProfile />
      </div>
      <Button className={s.button} variant={'outlined'}>
        Add a Profile Photo
      </Button>
    </div>
  );
};
