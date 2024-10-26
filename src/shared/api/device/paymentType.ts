export type paymentType = {
  amount: number;
  baseUrl: string;
  paymentType: string;
  typeSubscription: string;
};

export type paymentTypeResponse = {
  url: string;
};

export interface CurrentPaymentSubscriptionsResponse {
  data: CurrentPaymentSubscriptionsData[];
  hasAutoRenewal: boolean;
}

export interface CurrentPaymentSubscriptionsData {
  autoRenewal: boolean;
  dateOfPayment: string;
  endDateOfSubscription: string;
  subscriptionId: string;
  userId: number;
}
