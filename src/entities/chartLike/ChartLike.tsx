import React from 'react';

import { Chart, ChartData } from '@/shared/chart/Chart';
import { Typography } from '@/shared/typography/Typography';

import s from './ChartLike.module.scss';

type Props = {
  children: React.ReactNode;
};

const data: ChartData[] = [
  { comments: 30, likes: 150, name: 'Post 1' },
  { comments: 40, likes: 200, name: 'Post 2' },
  { comments: 50, likes: 250, name: 'Post 3' },
  { comments: 60, likes: 300, name: 'Post 4' },
  { comments: 70, likes: 350, name: 'Post 5' }
];

export const ChartLike = ({ children }: Props) => {
  return (
    <>
      <div className={s.headChart}>
        <Typography as={'h3'} variant={'h3'}>
          Like
        </Typography>
        {children}
      </div>

      <Chart data={data} dataKeys={{ comments: '#82ca9d', likes: '#8884d8' }} />
    </>
  );
};
