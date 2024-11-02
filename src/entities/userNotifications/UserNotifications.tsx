import React from 'react';

import Outlinebell from '@/../public/assets/components/Outlinebell';
import { CustomDropdownItem, CustomDropdownWrapper, NotificationItem } from '@/shared/ui';

import s from './UserNotifications.module.scss';

const notifications: Record<string, string> = {
  'New comments': 'New comments',
  'New followers': 'New followers',
  'New messages': 'New messages'
};

export const UserNotifications = () => (
  <CustomDropdownWrapper
    trigger={
      <div className={s.notificationItem} tabIndex={0}>
        <Outlinebell className={s.bell} />
      </div>
    }
    align={'end'}
    className={s.DropdownNotifications}
    isArrow
  >
    <CustomDropdownItem className={s.notificationItemWrap}>
      <NotificationItem text={'Уведомления'} />
      {Object.values(notifications).map((notification) => (
        <NotificationItem key={notification} text={notification} />
      ))}
    </CustomDropdownItem>
  </CustomDropdownWrapper>
);
