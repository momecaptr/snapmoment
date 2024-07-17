'use client';
import React from 'react';

import { SwitchChartLike } from '@/features/switchChartLike/SwitchChartLike';
import { Typography } from '@/shared/typography/Typography';

import s from './Statistics.module.scss';

const Statistics = () => {
  return (
    <div>
      <Typography as={'h1'} className={s.title} variant={'h1'}>
        Statistics
      </Typography>
      <SwitchChartLike />
    </div>
  );
};

export default Statistics;
