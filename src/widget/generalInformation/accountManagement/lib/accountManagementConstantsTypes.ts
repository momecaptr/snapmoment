// export type ChooseAccountType = 'Business' | 'Personal';

import {
  accountVariants,
  errorPayModalContentVariant,
  paymentVariants,
  subscriptionVariants
} from './accountManagementConstants';

export type AccountVariantTypes = (typeof accountVariants)[keyof typeof accountVariants];
// export type ChoosePaymentType = 'PAYPAL' | 'STRIPE';
export type PaymentVariantTypes = (typeof paymentVariants)[keyof typeof paymentVariants];
// export type ChoosePaymentType = 'DAY' | 'MONTHLY' | 'WEEKLY';
export type SubscriptionVariantTypes = (typeof subscriptionVariants)[keyof typeof subscriptionVariants];

export type PaymentModalContentType = typeof errorPayModalContentVariant;
