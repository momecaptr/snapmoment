import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';

import {
  DeleteAsReadNotificationsArgs,
  NotificationsArgs,
  NotificationsResponse,
  SetAsReadNotificationsArgs
} from './notificationsTypes'; // Импортируйте необходимые типы

export const notificationsAPI = snapmomentAPI.injectEndpoints({
  endpoints: (build) => ({
    deleteNotifications: build.mutation<void, DeleteAsReadNotificationsArgs>({
      invalidatesTags: ['Notifications'],
      query: ({ id }) => {
        return {
          method: 'DELETE',
          url: `/v1/notifications/${id}`
        };
      }
    }),
    getNotifications: build.query<NotificationsResponse, NotificationsArgs>({
      providesTags: ['Notifications'],
      query: ({ cursor = null, pageSize, sortBy = 'createdAt', sortDirection = 'desc' }) => {
        return {
          method: 'GET',
          url: `/v1/notifications/${cursor}?pageSize=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`
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

export const {
  useDeleteNotificationsMutation,
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useSetAsReadNotificationsMutation
} = notificationsAPI;
