import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import { DeviceType, DeviceTypeArgs } from '@/shared/api/payment/deviceType';

export const deviceApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    getDevice: builder.query<DeviceType, void>({
      query: () => ({
        url: `/v1/sessions`
      }),
      providesTags: ['Device']
    }),
    deleteTerminateDevice: builder.mutation<void, void>({
      query: () => ({
        url: `/v1/sessions/terminate-all`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Device']
    }),
    deleteSessionDevice: builder.mutation<void, DeviceTypeArgs>({
      query: (data) => ({
        url: `/v1/sessions/${data}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Device']
    })
  })
});

export const { useGetDeviceQuery, useDeleteTerminateDeviceMutation, useDeleteSessionDeviceMutation } = deviceApi;
