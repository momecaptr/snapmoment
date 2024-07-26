import React from 'react';

import Girl from '@/../public/assets/components/GirlDefault';
import { Button, Typography } from '@/shared/ui';
import Link from 'next/link';

import s from '@/pagesComponents/congratulations/ui/Congratulation.module.scss';
export const Congratulations = () => {
  return (
    <div>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Congratulations!
      </Typography>
      <Typography as={'p'} className={s.subtitle} variant={'regular_text_16'}>
        Your email has been confirmed
      </Typography>
      <div className={s.buttonBox}>
        <Button as={Link} className={s.button} href={'/sign-in'}>
          Sign In
        </Button>
      </div>
      <div className={s.boxImg}>
        <Girl />
      </div>
    </div>
  );
};
