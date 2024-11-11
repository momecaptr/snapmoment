import React, { memo, useCallback, useRef } from 'react';

import { fetchNotifications, markNotificationsAsRead } from '@/entities/userNotifications/api/notificationSlice';
import { INotificationItem } from '@/shared/api/notifications/notificationsTypes';
import { useAppDispatch } from '@/shared/lib';
import { useDebounceFn } from '@/shared/lib/hooks/useDebounceFn';
import { IUseInfiniteScroll, useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { NotificationItem, Typography } from '@/shared/ui';

import s from '@/entities/userNotifications/UserNotifications.module.scss';

type Props = {
  cursorId: null | number;
  hasNoMoreNotices: boolean;
  isNoticesExists: boolean;
  isNoticesFetching: boolean;
  notices: INotificationItem[];
};

const NEXT_NOTICES_COUNT = 1;
const MARK_AR_READ_DELAY = 1500;

const DropDownContent = (props: Props) => {
  const { cursorId, hasNoMoreNotices, isNoticesExists, isNoticesFetching, notices } = props;
  const dispatch = useAppDispatch();
  const triggerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const hoveredItemIdsRef = useRef<number[]>([]);

  // Отложенная отправка массива id's
  const debouncedSendHoveredIds = useDebounceFn(() => {
    if (hoveredItemIdsRef.current.length) {
      dispatch(markNotificationsAsRead(hoveredItemIdsRef.current));
    }
    hoveredItemIdsRef.current = [];
  }, MARK_AR_READ_DELAY);

  const handleItemHover = useCallback(
    (itemID: number, isRead: boolean) => () => {
      if (!isRead && !hoveredItemIdsRef.current.includes(itemID)) {
        hoveredItemIdsRef.current.push(itemID);
        debouncedSendHoveredIds();
      }
    },
    [debouncedSendHoveredIds]
  );

  const onLoadNextNotices = useCallback(() => {
    if (isNoticesExists && !isNoticesFetching && !hasNoMoreNotices && !!cursorId) {
      dispatch(fetchNotifications({ cursor: cursorId, pageSize: NEXT_NOTICES_COUNT }));
    }
  }, [isNoticesExists, isNoticesFetching, hasNoMoreNotices, cursorId, dispatch]);

  // Используем хук для бесконечной пагинации
  useInfiniteScroll({
    callBack: onLoadNextNotices,
    rootMargin: '0px',
    threshold: 0.1,
    triggerRef
  } as IUseInfiniteScroll);

  return (
    <div>
      <div className={s.title}>
        <Typography variant={'bold_text_16'}>Notifications</Typography>
      </div>

      <div className={s.msgsWrapper}>
        <div>
          <div className={s.msgs}>
            {isNoticesExists &&
              notices.map((notice) => (
                <div key={notice.id} onMouseEnter={handleItemHover(notice.id, notice.isRead)}>
                  <NotificationItem isReadNotice={notice.isRead} notice={notice} />
                </div>
              ))}
            <div className={s.invisibleTrigger} ref={triggerRef}>
              invisibleTrigger
            </div>
          </div>
          {!isNoticesExists && (
            <div className={s.noNotifications}>
              <Typography variant={'regular_text_14'}>You have no new notices</Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MemoizedDropDownContent = memo(DropDownContent);

export { MemoizedDropDownContent as DropDownContent };
