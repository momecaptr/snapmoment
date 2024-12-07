import React, { memo, useCallback, useEffect, useRef } from 'react';

import Fillbell from '@/../public/assets/components/Fillbell';
import Outlinebell from '@/../public/assets/components/Outlinebell';
import { DropDownContent } from '@/entities/userNotifications/DropDownContent';
import {
  fetchNotifications,
  notificationActions,
  notificationSelectors
} from '@/entities/userNotifications/api/notificationSlice';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { CustomDropdownItem, CustomDropdownWrapper, Typography } from '@/shared/ui';
import { clsx } from 'clsx';
import { Socket, io } from 'socket.io-client';

import s from './UserNotifications.module.scss';

const SOCKET_URL = 'https://inctagram.work';
const START_NOTICES_COUNT = 5;

const UserNotifications = () => {
  const ACCESS_TOKEN = JSON.parse(localStorage.getItem('accessToken') as string);
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useAppDispatch();

  const cursorId = useAppSelector(notificationSelectors.getCursorId);
  const hasNoMoreNotices = !useAppSelector(notificationSelectors.getHasMore);
  const isNoticesFetching = useAppSelector(notificationSelectors.getIsFetching);
  const isOpen = useAppSelector(notificationSelectors.getIsOpen);
  const notices = useAppSelector(notificationSelectors.getNotifications);
  const unReadCount = useAppSelector(notificationSelectors.getNotReadCount);

  const isNoticesExists = notices.length > 0;

  // Первоначальная загрузка уведомлений и количества непрочитанных
  useEffect(() => {
    dispatch(fetchNotifications({ cursor: cursorId, pageSize: START_NOTICES_COUNT }));

    return () => {};
  }, []);

  //Подключение к сокету и просолучение события NOTIFICATION
  useEffect(() => {
    const socket = io(SOCKET_URL, { query: { accessToken: ACCESS_TOKEN } });

    socket.on('NOTIFICATION', (data) => {
      dispatch(notificationActions.addNewNotification(data));
    });

    return () => {
      socket.disconnect();
    };
  }, [ACCESS_TOKEN, socketRef]);

  //Отмена закрытия дроплауна при клике на эллементы
  const handleItemClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDropdownToggle = useCallback(
    (openState: boolean) => {
      dispatch(notificationActions.changeDropDownState({ isOpen: openState }));
    },
    [dispatch]
  );

  return (
    <CustomDropdownWrapper
      trigger={
        <div className={s.notifierWrap} tabIndex={0}>
          {unReadCount > 0 && (
            <div className={s.notificationCount}>
              <Typography variant={'small_text'}>{unReadCount}</Typography>
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
        <DropDownContent
          cursorId={cursorId}
          hasNoMoreNotices={hasNoMoreNotices}
          isNoticesExists={isNoticesExists}
          isNoticesFetching={isNoticesFetching}
          notices={notices}
        />
      </CustomDropdownItem>
    </CustomDropdownWrapper>
  );
};

const MemoizedUserNotifications = memo(UserNotifications);

export { MemoizedUserNotifications as UserNotifications };
