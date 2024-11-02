import React from 'react';

import { paymentVariants } from '@/shared/lib';
import { clsx } from 'clsx';

import s from './PaymentButtons.module.scss';

import PayPal from '../../../public/assets/components/PayPal';
import Stripe from '../../../public/assets/components/Stripe';

type PaymentButtonsProps = { handleSubmitPaymentType: (e: React.MouseEvent<HTMLDivElement>) => void };

export const PaymentButtons = ({ handleSubmitPaymentType }: PaymentButtonsProps) => {
  return (
    <div className={s.payIconBox}>
      <div
        className={clsx(s.paymentTypeBox, s.boxPaypal)}
        data-payment={paymentVariants.paypal}
        onClick={handleSubmitPaymentType}
      >
        <PayPal />
      </div>
      <div>or</div>
      <div
        className={clsx(s.paymentTypeBox, s.boxStripe)}
        data-payment={paymentVariants.stripe}
        onClick={handleSubmitPaymentType}
      >
        <Stripe />
      </div>
    </div>
  );
};
