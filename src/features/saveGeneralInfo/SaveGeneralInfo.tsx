import React from 'react';

import { Button } from '@/shared/button/Button';

import s from './SaveGeneralInfo.module.scss';

const SaveGeneralInfo = () => {
  return (
    <>
      <div className={s.box}>
        <Button className={s.button}>Save Changes</Button>
      </div>
    </>
  );
};

export default SaveGeneralInfo;
