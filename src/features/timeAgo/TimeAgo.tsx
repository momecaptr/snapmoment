import * as React from 'react';
import ReactTimeAgo from 'react-time-ago';

import { Typography } from '@/shared/ui';

import s from './TimaAgo.module.scss';

type Props = {
  time: string;
};

export const TimeAgo = ({ time }: Props) => {
  return (
    <Typography className={s.date} variant={'small_text'}>
      <ReactTimeAgo date={new Date(time)} />
    </Typography>
  );
};
