import { useState } from 'react';

import Close from '@/../public/assets/components/Close';
import { Button, Typography } from '@/shared/ui';

import s from './NotificationItem.module.scss';

type Props = {
  id: number;
  isRead: boolean;
  message: string;
};

export const NotificationItem = (props: Props) => {
  const { message } = props;
  const [isRead, setIsRead] = useState();

  const handleClick = () => {};

  return (
    <div className={s.notification}>
      <div className={s.title}>
        <div className={s.newBox}>
          <Typography variant={'bold_text_16'}>New notice!</Typography>
          <Typography className={s.new} variant={'small_text'}>
            New
          </Typography>
        </div>
        <Button className={s.closeButton} onClick={handleClick} title={'Clear'} variant={'text'}>
          <Close />
        </Button>
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
