export type PaymentArgs = {
  amount: number;
  baseUrl: string;
  paymentType: string;
  typeSubscription: string;
};

export type PaymentResponse = {
  url: string;
};

export type MyPaymentsResponse = MySinglePayment[];

export interface MySinglePayment {
  dateOfPayment: string;
  endDateOfSubscription: string;
  paymentType: string;
  price: number;
  subscriptionId: string;
  subscriptionType: string;
  userId: number;
}

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
