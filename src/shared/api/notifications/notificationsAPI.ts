import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';

import { NotificationsArgs, NotificationsResponse } from './notificationsTypes'; // Импортируйте необходимые типы

export const notificationsAPI = snapmomentAPI.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<NotificationsResponse, NotificationsArgs>({
      providesTags: ['Notifications'],
      query: ({ cursor, pageSize = 12, sortDirection = 'desc' }) => ({
        method: 'GET',
        //url: `/api/v1/notifications/${cursor}?pageSize=${pageSize}&sortDirection=${sortDirection}`
        url: '/v1/notifications/'
      })
    })
  })
});

export const { useGetNotificationsQuery, useLazyGetNotificationsQuery } = notificationsAPI;
