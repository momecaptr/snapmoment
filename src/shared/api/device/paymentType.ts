export type paymentType = {
  typeSubscription: string;
  paymentType: string;
  amount: number;
  baseUrl: string;
};

export type paymentTypeResponse = {
  url: string;
};

export interface CurrentPaymentSubscriptionsResponse {
  data: CurrentPaymentSubscriptionsData[];
  hasAutoRenewal: boolean;
}

export interface CurrentPaymentSubscriptionsData {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  autoRenewal: boolean;
}
