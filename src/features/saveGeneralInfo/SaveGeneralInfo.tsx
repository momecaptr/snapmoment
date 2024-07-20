import React from 'react';

import { Button } from '@/shared/ui';
import { clsx } from 'clsx';

import s from './SaveGeneralInfo.module.scss';
type SaveGeneralInfoProps = {
  className?: string;
};

export const SaveGeneralInfo = (props: SaveGeneralInfoProps) => {
  const { className } = props;

  return (
    <>
      <div className={s.box}>
        <Button className={clsx(className, s.button)}>Save Changes</Button>
      </div>
    </>
  );
};
