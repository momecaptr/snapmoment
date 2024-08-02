import * as React from 'react';

import { useGetTotalUsersCountQuery } from '@/shared/api/public/publicApi';
import { Typography } from '@/shared/ui';

import s from './RegisteredIsersCounter.module.scss';

export const RegisteredUsersCounter = () => {
  const { data: totalUsersCount } = useGetTotalUsersCountQuery();

  const totalUsersCountArr = totalUsersCount?.totalCount.toString().padStart(6, '0').split('') || [];

  return (
    <div className={s.container}>
      <Typography variant={'h2'}>Registered users:</Typography>
      <div className={s.counter}>
        {totalUsersCountArr.map((count, index) => (
          <Typography className={s.count} key={index} variant={'h2'}>
            {count}
          </Typography>
        ))}
      </div>
    </div>
  );
};
