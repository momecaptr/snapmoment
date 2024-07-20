import React from 'react';

import { SwitchChartLike } from '@/features';
import { Typography } from '@/shared/ui';

import s from './Statistics.module.scss';

export const Statistics = () => {
  return (
    <div>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Statistics
      </Typography>
      <SwitchChartLike />
    </div>
  );
};
