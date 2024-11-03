export const accountVariants = {
  business: 'Business',
  personal: 'Personal'
};

export const paymentVariants = {
  paypal: 'PAYPAL',
  stripe: 'STRIPE'
};

export const subscriptionVariants = {
  day: 'DAY',
  monthly: 'MONTHLY',
  weekly: 'WEEKLY'
};

export const subscriptionsTextOptions = {
  [subscriptionVariants.day]: `$10 per ${subscriptionVariants.day.toLowerCase()}`,
  [subscriptionVariants.monthly]: `$100 ${subscriptionVariants.monthly.toLowerCase()}`,
  [subscriptionVariants.weekly]: `$50 ${subscriptionVariants.weekly.toLowerCase()}`
};

export const errorPayModalContentVariant = {
  buttonText: 'Back to payment',
  description: 'Transaction failed. Please, write to support.',
  title: 'Error'
};

export const successPayModalContentVariant = {
  buttonText: 'OK',
  description: 'Payment was successful!',
  title: 'Success'
};

export const notifyPayModalContentVariant = {
  buttonText: 'Back to payment',
  description: 'Please, choose payment type before proceed.',
  title: 'Choose subscription plan'
};

export const subscriptionVariantsArray = [
  subscriptionVariants.day,
  subscriptionVariants.weekly,
  subscriptionVariants.monthly
];
