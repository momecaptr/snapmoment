import React, { memo, useCallback, useRef } from 'react';

import { fetchNotifications } from '@/entities/userNotifications/api/notificationSlice';
import { INotificationItem } from '@/shared/api/notifications/notificationsTypes';
import { useAppDispatch } from '@/shared/lib';
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

const DropDownContent = (props: Props) => {
  const { cursorId, hasNoMoreNotices, isNoticesExists, isNoticesFetching, notices } = props;
  const dispatch = useAppDispatch();
  const triggerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  /*const [isReadMark, setIsReadMark] = useState<number[]>([]);
  const readNotifications = useMemo(() => notices.filter((item) => item.isRead).map((item) => item.id), [notices]);*/

  // Запрос уведомлений (последующие)
  const onLoadNextNotices = useCallback(() => {
    // Проверяем, что мы не загружаем данные и что либо уведомлений нет, либо есть курсор для продолжения загрузки
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

  // Обновление значения прочитанных уведомлений при наведении
  const handleItemHover = useCallback(
    (itemID: number) => () => {
      /*      if (!readNotifications.includes(itemID) && !isReadMark.includes(itemID)) {
        setIsReadMark([...isReadMark, itemID]);
      }*/
    },
    []
  );

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
                <div key={notice.id} onMouseLeave={handleItemHover(notice.id)}>
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
