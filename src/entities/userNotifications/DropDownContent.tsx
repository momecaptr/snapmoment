import React, { Dispatch, MutableRefObject, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';

import { useLazyGetNotificationsQuery } from '@/shared/api/notifications/notificationsAPI';
import { INotificationItem } from '@/shared/api/notifications/notificationsTypes';
import { IUseInfiniteScroll, useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { NotificationItem, Typography } from '@/shared/ui';

import s from '@/entities/userNotifications/UserNotifications.module.scss';

type Props = {
  readedNotifications: number[];
  setNewNotificationsCount: Dispatch<SetStateAction<number | undefined>>;
  setReadedNotifications: (readedNotices: number[]) => void;
};

const NEXT_NOTICES_COUNT = 1;

export const DropDownContent = (props: Props) => {
  const { readedNotifications, setNewNotificationsCount, setReadedNotifications } = props;
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [fetchNotices, { data: noticesData, isFetching: isNoticesFetching }] = useLazyGetNotificationsQuery();

  //Проверяем есть ли еще уведомления на сервере
  const hasNoMoreNotices = noticesData?.totalCount === noticesData?.items.length;

  //делаем уведомления прочитанными при загрузке компонента
  const handleItemHover = (itemID: number) => () => {
    if (!readedNotifications.includes(itemID)) {
      setReadedNotifications([...readedNotifications, itemID]);
      setNewNotificationsCount((prev) => prev && prev - 1);
    }
  };

  console.log(readedNotifications);

  useEffect(() => {
    fetchNotices({ pageSize: 3 });
  }, []);

  const onLoadNextNotices = useCallback(() => {
    if (!isNoticesFetching && !hasNoMoreNotices && noticesData) {
      fetchNotices({ pageSize: noticesData.items.length + NEXT_NOTICES_COUNT });
    }
  }, [isNoticesFetching]);

  useInfiniteScroll({
    callBack: onLoadNextNotices,
    rootMargin: '0px',
    threshold: 0.1,
    triggerRef
  } as IUseInfiniteScroll);

  useEffect(() => {
    if (noticesData && noticesData.items) {
      setNotifications([...noticesData.items]);
    }
  }, [noticesData]);

  return (
    <div>
      <div className={s.title}>
        <Typography variant={'bold_text_16'}>Notifications</Typography>
        {/*{filteredNotifications && filteredNotifications.length > 0 && (
              <Button className={s.clearButton} title={'Clear all'} variant={'secondary'}>
                <Typography className={s.time} variant={'small_text'}>
                  Clear all
                </Typography>
              </Button>
            )}*/}
      </div>

      <div className={s.msgsWrapper}>
        <div>
          <div className={s.msgs}>
            {noticesData && noticesData.items.length === 0 && (
              <div className={s.noNotifications}>
                <Typography variant={'regular_text_14'}>You have no new notices</Typography>
              </div>
            )}

            {noticesData &&
              noticesData.items.length > 0 &&
              Object.values(notifications).map((notice) => (
                <div key={notice.id} onMouseEnter={handleItemHover(notice.id)}>
                  <NotificationItem notice={notice} readedNotices={readedNotifications} />
                </div>
              ))}
          </div>
          <div ref={triggerRef} style={{ opacity: 0 }}>
            .
          </div>
        </div>
      </div>

      {/*<div className={s.showMoreBtn} onClick={handleDropdownToggle}>
          <Button variant={'secondary'} fullWidth>
            <Typography variant={'small_text'}>Show more</Typography>
          </Button>
        </div>*/}
    </div>
  );
};
