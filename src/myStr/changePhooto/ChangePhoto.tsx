import React from 'react';

import PhotoProfile from '@/shared/PhotoProfile/PhotoProfile';
import { Button } from '@/shared/button/Button';

import s from './ChangePhoto.module.scss';
const ChangePhoto = () => {
  return (
    <div className={s.box}>
      <PhotoProfile />
      <Button className={s.butoon}>Add a Profile Photo</Button>
    </div>
  );
};

export default ChangePhoto;
