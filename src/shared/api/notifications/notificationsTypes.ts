export interface INotificationItem {
  id: number;
  isRead: boolean;
  message: string;
  notifyAt: string;
}

export interface NotificationsResponse {
  items: INotificationItem[];
  pageSize: number;
  totalCount: number;
}

export interface NotificationsArgs {
  cursor?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
}

export interface SetAsReadNotificationsArgs {
  ids: number[];
}

export interface DeleteAsReadNotificationsArgs {
  id: number;
}
