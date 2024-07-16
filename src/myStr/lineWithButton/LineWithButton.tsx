import React from 'react';

import { Button } from '@/shared/button/Button';

import s from './LineWithButton.module.scss';

const LineWithButton = () => {
  return (
    <>
      <div className={s.box}>
        <span className={s.line} />
        <Button className={s.button}>Save Changes</Button>
      </div>
    </>
  );
};

export default LineWithButton;
