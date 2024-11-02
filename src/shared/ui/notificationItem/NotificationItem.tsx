import { Typography } from '@/shared/ui';

import s from './NotificationItem.module.scss';

export const NotificationItem = ({ text }: { text: string }) => (
  <div className={s.notificationEl}>
    <Typography className={s.notificationItem} variant={'h2'}>
      {text}
    </Typography>
  </div>
);
