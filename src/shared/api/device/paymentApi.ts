import { snapmomentAPI } from '@/shared/api/common/snapmomentAPI';
import {
  CurrentPaymentSubscriptionsResponse,
  MyPaymentsResponse,
  PaymentArgs,
  PaymentResponse
} from '@/shared/api/device/paymentType';

export const paymentApi = snapmomentAPI.injectEndpoints({
  endpoints: (builder) => ({
    cancelAutoRenewal: builder.mutation<void, void>({
      invalidatesTags: ['Payment'],
      query: () => ({
        method: 'POST',
        url: '/v1/subscriptions/canceled-auto-renewal'
      })
    }),
    getCurrentPaymentSubscription: builder.query<CurrentPaymentSubscriptionsResponse, void>({
      providesTags: ['Payment'],
      query: () => ({
        method: 'GET',
        url: '/v1/subscriptions/current-payment-subscriptions'
      })
    }),
    getMyPaymentsData: builder.query<MyPaymentsResponse, void>({
      query: () => '/v1/subscriptions/my-payments'
    }),
    sendPayment: builder.mutation<PaymentResponse, PaymentArgs>({
      invalidatesTags: ['Payment'],
      query: (data) => ({
        body: data,
        method: 'POST',
        url: '/v1/subscriptions'
      })
    })
  })
});

export const {
  useCancelAutoRenewalMutation,
  useGetCurrentPaymentSubscriptionQuery,
  useGetMyPaymentsDataQuery,
  useSendPaymentMutation
} = paymentApi;
