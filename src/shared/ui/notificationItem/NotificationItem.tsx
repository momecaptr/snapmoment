import { Typography } from '@/shared/ui';

import s from './NotificationItem.module.scss';

type Props = {
  message: string;
};

export const NotificationItem = (props: Props) => {
  const { message } = props;

  return (
    <div className={s.notification}>
      <div className={s.newBox}>
        <Typography variant={'bold_text_16'}>New notice!</Typography>
        <Typography className={s.new} variant={'small_text'}>
          New
        </Typography>
      </div>
      <Typography className={s.message} variant={'regular_text_14'}>
        {message}
      </Typography>
      <Typography className={s.time} variant={'small_text'}>
        1 час назад
      </Typography>
    </div>
  );
};
