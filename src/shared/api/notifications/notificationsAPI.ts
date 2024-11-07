import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';

import { NotificationsArgs, NotificationsResponse, SetAsReadNotificationsArgs } from './notificationsTypes'; // Импортируйте необходимые типы

export const notificationsAPI = snapmomentAPI.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<NotificationsResponse, NotificationsArgs>({
      providesTags: ['Notifications'],
      query: ({ cursor = null, pageSize, sortDirection = 'desc' }) => {
        return {
          method: 'GET',
          url: `/v1/notifications/${cursor}?pageSize=${pageSize}&sortDirection=${sortDirection}`
        };
      }
    }),
    setAsReadNotifications: build.mutation<void, SetAsReadNotificationsArgs>({
      invalidatesTags: ['Notifications'],
      query: ({ ids }) => {
        return {
          body: {
            ids
          },
          method: 'PUT',
          url: '/v1/notifications/mark-as-read'
        };
      }
    })
  })
});

export const { useGetNotificationsQuery, useLazyGetNotificationsQuery, useSetAsReadNotificationsMutation } =
  notificationsAPI;
