import React from 'react';

import Girl from '@/../public/assets/components/GirlDefault';
import { Button, Typography } from '@/shared/ui';

import s from '@/pagesComponents/congratulations/Congratulation.module.scss';
export const Congratulations = () => {
  return (
    <div>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Congratulations!
      </Typography>
      <Typography as={'p'} className={s.subtitle} variant={'regular_text_16'}>
        Your email has been confirme
      </Typography>
      <div className={s.buttonBox}>
        <Button className={s.button}>Sign In</Button>
      </div>
      <div className={s.boxImg}>
        <Girl />
      </div>
    </div>
  );
};
