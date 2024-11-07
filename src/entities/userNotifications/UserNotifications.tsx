import React, { useEffect, useState } from 'react';

import Outlinebell from '@/../public/assets/components/Outlinebell';
import { DropDownContent } from '@/entities/userNotifications/DropDownContent';
import {
  useGetNotificationsQuery,
  useSetAsReadNotificationsMutation
} from '@/shared/api/notifications/notificationsAPI';
import { useSocket } from '@/shared/lib/hooks/useSocket';
import { CustomDropdownItem, CustomDropdownWrapper } from '@/shared/ui';

import s from './UserNotifications.module.scss';

export const UserNotifications = () => {
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  const { data: notificationsData, refetch } = useGetNotificationsQuery({});

  const [readedNotifications, setReadedNotifications] = useState<number[]>([]);
  const [newNotificationsCount, setNewNotificationsCount] = useState<number | undefined>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [markAsRead] = useSetAsReadNotificationsMutation();

  useEffect(() => {
    if (notificationsData) {
      const unreadCount = notificationsData.items.filter((notification) => !notification.isRead).length;

      setNewNotificationsCount(unreadCount);
    }
  }, [notificationsData]);

  const handleDropdownToggle = (isOpen: boolean) => {
    return () => {
      if (!isOpen && readedNotifications.length > 0) {
        markAsRead({ ids: readedNotifications });
      }
      setIsOpen(isOpen);
    };
  };

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  useSocket({
    events: {
      NOTIFICATION: () => {
        refetch();
      }
    },
    onConnect: () => console.log('Connected to WebSocket server'),
    onDisconnect: () => console.log('Disconnected from WebSocket server'),
    onError: (error) => console.error('General connection error:', error),
    params: { query: { accessToken: ACCESS_TOKEN } },
    url: 'https://inctagram.work'
  });

  return (
    <CustomDropdownWrapper
      trigger={
        <div className={s.notificationItem} tabIndex={0}>
          {newNotificationsCount && newNotificationsCount > 0 && (
            <div className={s.notificationCount}>{newNotificationsCount}</div>
          )}
          <Outlinebell className={s.bell} />
        </div>
      }
      align={'end'}
      className={s.dropdownNotifications}
      classNameArrow={s.arrow}
      classNameTriggerActive={s.bellActive}
      onCloseCallback={handleDropdownToggle(false)}
      onOpenCallback={handleDropdownToggle(true)}
      stayOpen={isOpen}
      isArrow
    >
      <CustomDropdownItem className={s.notificationItemWrap} onClick={handleItemClick}>
        <DropDownContent
          readedNotifications={readedNotifications}
          setNewNotificationsCount={setNewNotificationsCount}
          setReadedNotifications={setReadedNotifications}
        />
      </CustomDropdownItem>
    </CustomDropdownWrapper>
  );
};
