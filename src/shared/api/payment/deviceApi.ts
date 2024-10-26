import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import { DeviceType, DeviceTypeArgs } from '@/shared/api/payment/deviceType';

export const deviceApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    deleteSessionDevice: builder.mutation<void, DeviceTypeArgs>({
      invalidatesTags: ['Device'],
      query: (data) => ({
        method: 'DELETE',
        url: `/v1/sessions/${data}`
      })
    }),
    deleteTerminateDevice: builder.mutation<void, void>({
      invalidatesTags: ['Device'],
      query: () => ({
        method: 'DELETE',
        url: '/v1/sessions/terminate-all'
      })
    }),
    getDevice: builder.query<DeviceType, void>({
      providesTags: ['Device'],
      query: () => ({
        url: '/v1/sessions'
      })
    })
  })
});

export const { useDeleteSessionDeviceMutation, useDeleteTerminateDeviceMutation, useGetDeviceQuery } = deviceApi;
