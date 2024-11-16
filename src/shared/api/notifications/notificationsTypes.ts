export interface INotificationItem {
  id: number;
  isRead: boolean;
  message: string;
  notifyAt: string;
}

export interface NotificationsResponse {
  items: INotificationItem[];
  notReadCount: number;
  pageSize: number;
  totalCount: number;
}

export interface NotificationsArgs {
  cursor?: null | number;
  isRead?: boolean | null;
  pageSize?: null | number;
  sortBy?: null | string;
  sortDirection?: null | string;
}

export interface SetAsReadNotificationsArgs {
  ids: number[];
}

export interface DeleteAsReadNotificationsArgs {
  id: number;
}
