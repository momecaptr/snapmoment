import React, { memo } from 'react';
import ReactTimeAgo from 'react-time-ago';

import Close from '@/../public/assets/components/Close';
import { deleteNotification } from '@/entities/userNotifications/api/notificationSlice';
import { INotificationItem } from '@/shared/api/notifications/notificationsTypes';
import { useAppDispatch } from '@/shared/lib';
import { Button, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './NotificationItem.module.scss';

type Props = {
  isReadNotice: boolean;
  notice: INotificationItem;
};

const NotificationItem = (props: Props) => {
  const {
    isReadNotice,
    notice: { id, message, notifyAt }
  } = props;
  const notifyDate = new Date(notifyAt);
  const dispatch = useAppDispatch();
  const handleRemoveNotice = () => {
    dispatch(deleteNotification(id));
  };

  return (
    <div className={s.notification}>
      <div className={s.closeButtonWrap}>
        <Button className={s.closeButton} onClick={handleRemoveNotice} title={'Clear'} variant={'text'}>
          <Close />
        </Button>
      </div>
      <div className={s.title}>
        {!isReadNotice && (
          <div className={s.newBox}>
            <Typography variant={'bold_text_16'}>New notice!</Typography>
            <Typography className={s.new} variant={'small_text'}>
              New
            </Typography>
          </div>
        )}
        {isReadNotice && <div className={s.readedNotice}></div>}
      </div>

      <Typography className={clsx(s.message, isReadNotice && s.isRead)} variant={'regular_text_14'}>
        {message}
      </Typography>
      <Typography className={s.time} variant={'small_text'}>
        <ReactTimeAgo date={notifyDate} locale={'en-US'} />
      </Typography>
    </div>
  );
};

const MemoizedNotificationItem = memo(NotificationItem);

export { MemoizedNotificationItem as NotificationItem };
