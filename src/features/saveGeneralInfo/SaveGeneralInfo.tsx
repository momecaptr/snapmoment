import React from 'react';

import { Button } from '@/shared/button/Button';
import { clsx } from 'clsx';

import s from './SaveGeneralInfo.module.scss';
type SaveGeneralInfoProps = {
  className?: string;
};
const SaveGeneralInfo = (props: SaveGeneralInfoProps) => {
  const { className } = props;

  return (
    <>
      <div className={s.box}>
        <Button className={clsx(className, s.button)}>Save Changes</Button>
      </div>
    </>
  );
};

export default SaveGeneralInfo;
