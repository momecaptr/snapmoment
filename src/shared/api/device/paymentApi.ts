import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import { CurrentPaymentSubscriptionsResponse, paymentType, paymentTypeResponse } from '@/shared/api/device/paymentType';

export const paymentApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentPaymentSubscription: builder.query<CurrentPaymentSubscriptionsResponse, void>({
      providesTags: ['Payment'],
      query: () => ({
        method: 'GET',
        url: '/v1/subscriptions/current-payment-subscriptions'
      })
    }),
    sendPayment: builder.mutation<paymentTypeResponse, paymentType>({
      invalidatesTags: ['Payment'],
      query: (data) => ({
        body: data,
        method: 'POST',
        url: '/v1/subscriptions'
      })
    })
  })
});

export const { useGetCurrentPaymentSubscriptionQuery, useSendPaymentMutation } = paymentApi;
