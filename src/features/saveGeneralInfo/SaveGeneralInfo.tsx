import React from 'react';

import { Button } from '@/shared/ui';

import s from './SaveGeneralInfo.module.scss';

export const SaveGeneralInfo = () => {
  return (
    <>
      <div className={s.box}>
        <Button className={s.button}>Save Changes</Button>
      </div>
    </>
  );
};
