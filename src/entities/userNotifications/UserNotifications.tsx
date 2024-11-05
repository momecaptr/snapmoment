import React, { useEffect, useRef, useState } from 'react';

import Outlinebell from '@/../public/assets/components/Outlinebell';
import { useGetNotificationsQuery } from '@/shared/api/notifications/notificationsAPI';
import { INotificationItem } from '@/shared/api/notifications/notificationsTypes';
import { useSocket } from '@/shared/lib/hooks/useSocket';
import { Button, CustomDropdownItem, CustomDropdownWrapper, NotificationItem, Typography } from '@/shared/ui';

import s from './UserNotifications.module.scss';

export const UserNotifications = () => {
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const ACCESS_TOKEN = localStorage.getItem('accessToken');
  const { data: notificationsData, refetch } = useGetNotificationsQuery({ cursor: 0 }); // useGetNotificationsQuery

  /*___________DROPDOWN____________*/
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
    // Дополнительная логика при клике на элемент
  };
  /*___________DROPDOWN____________*/

  console.log(notificationsData);
  console.log(notifications);

  useEffect(() => {
    if (notificationsData && notificationsData.items) {
      setNotifications((prevState) => [...prevState, ...notificationsData.items]);
    }
  }, [notificationsData]);

  useSocket({
    events: {
      NOTIFICATION: (data) => {
        console.log('NOTIFICATION:', data);
      }
    },
    onConnect: () => console.log('Connected to WebSocket server'),
    onDisconnect: () => console.log('Disconnected from WebSocket server'),
    onError: (error) => console.error('General connection error:', error),
    params: { query: { accessToken: ACCESS_TOKEN } }, // Параметры для подключения
    url: 'https://inctagram.work' // WebSocket URL
  });

  return (
    <CustomDropdownWrapper
      trigger={
        <div className={s.notificationItem} onClick={handleDropdownToggle} tabIndex={0}>
          <Outlinebell className={s.bell} />
        </div>
      }
      align={'end'}
      className={s.dropdownNotifications}
      stayOpen={isOpen}
      isArrow
    >
      <CustomDropdownItem className={s.notificationItemWrap} onClick={handleItemClick}>
        <div>
          <div className={s.title}>
            <Typography variant={'bold_text_16'}>Уведомления</Typography>
          </div>

          <div className={s.msgs}>
            {/*<Typography variant={'regular_text_14'}>У вас нет новых уведомлений</Typography>*/}

            {Object.values(notifications).map((notification) => (
              <div key={notification.id}>
                <NotificationItem message={notification.message} />
              </div>
            ))}
          </div>
          <div className={s.showMoreBtn} onClick={handleDropdownToggle}>
            <Button variant={'secondary'} fullWidth>
              <Typography variant={'small_text'}>Show more</Typography>
            </Button>
          </div>
        </div>
      </CustomDropdownItem>
    </CustomDropdownWrapper>
  );
};
