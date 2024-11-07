import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Fillbell from '@/../public/assets/components/Fillbell';
import Outlinebell from '@/../public/assets/components/Outlinebell';
import { DropDownContent } from '@/entities/userNotifications/DropDownContent';
import {
  useGetNotificationsQuery,
  useSetAsReadNotificationsMutation
} from '@/shared/api/notifications/notificationsAPI';
import { CustomDropdownItem, CustomDropdownWrapper, Typography } from '@/shared/ui';
import { clsx } from 'clsx';
import { Socket, io } from 'socket.io-client';

import s from './UserNotifications.module.scss';

const SOCKET_URL = 'https://inctagram.work';

export const UserNotifications = () => {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  const socketRef = useRef<Socket | null>(null);

  const { data: notificationsData, refetch } = useGetNotificationsQuery({});
  const [markAsRead] = useSetAsReadNotificationsMutation();

  const [readedNotifications, setReadedNotifications] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_URL, { query: { accessToken: ACCESS_TOKEN } });

    socket.on('NOTIFICATION', () => {
      refetch();
    });

    return () => {
      socket.disconnect();
    };
  }, [ACCESS_TOKEN, refetch, socketRef]);

  const newNotificationsCount = useMemo(
    () => notificationsData?.items.filter((notification) => !notification.isRead).length || 0,
    [notificationsData]
  );

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDropdownToggle = useCallback(
    (openState: boolean) => {
      if (!openState && readedNotifications.length > 0) {
        markAsRead({ ids: readedNotifications });
        setReadedNotifications([]);
      }
      setIsOpen(openState);
    },
    [markAsRead, readedNotifications]
  );

  return (
    <CustomDropdownWrapper
      trigger={
        <div className={s.notifierWrap} tabIndex={0}>
          {newNotificationsCount > 0 && (
            <div className={s.notificationCount}>
              <Typography variant={'small_text'}>{newNotificationsCount}</Typography>
            </div>
          )}
          {!isOpen ? <Outlinebell className={s.bell} /> : <Fillbell className={clsx(s.bell, isOpen && s.bellActive)} />}
        </div>
      }
      align={'end'}
      className={s.dropdownNotifications}
      classNameArrow={s.arrow}
      classNameTriggerActive={s.bellActive}
      onCloseCallback={() => handleDropdownToggle(false)}
      onOpenCallback={() => handleDropdownToggle(true)}
      stayOpen={isOpen}
      isArrow
    >
      <CustomDropdownItem className={s.notificationItemWrap} onClick={handleItemClick}>
        <DropDownContent readedNotifications={readedNotifications} setReadedNotifications={setReadedNotifications} />
      </CustomDropdownItem>
    </CustomDropdownWrapper>
  );
};
