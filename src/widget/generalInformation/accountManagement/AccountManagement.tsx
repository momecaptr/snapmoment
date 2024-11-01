import React, { useEffect } from 'react';

import { useGetCurrentPaymentSubscriptionQuery, useSendPaymentMutation } from '@/shared/api/device/paymentApi';
import { Radio, Typography } from '@/shared/ui';
import RenewalAndSubscriptionMenu from '@/widget/generalInformation/accountManagement/RenewalAndSubscriptionMenu';
import PayPal from '@/widget/generalInformation/accountManagement/icon/PayPal';
import Stripe from '@/widget/generalInformation/accountManagement/icon/Stripe';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';

import s from './AccountManagement.module.scss';

export const paymentVariants = {
  paypal: 'PAYPAL',
  stripe: 'STRIPE'
};

export type PaymentVariantTypes = (typeof paymentVariants)[keyof typeof paymentVariants];

export const subscriptionVariants = {
  day: 'DAY',
  monthly: 'MONTHLY',
  weekly: 'WEEKLY'
};
// export type ChoosePaymentType = 'DAY' | 'MONTHLY' | 'WEEKLY';
export type SubscriptionVariantTypes = (typeof subscriptionVariants)[keyof typeof subscriptionVariants];

export const AccountManagement: React.FC = () => {
  const { data } = useGetCurrentPaymentSubscriptionQuery();
  const [sendPayment] = useSendPaymentMutation();
  const [business, setBusiness] = React.useState<boolean>(false);
  const [savePaymentUrl, setSavePaymentUrl] = React.useState<string | undefined>(undefined);
  const [choosePayment, setChoosePayment] = React.useState<SubscriptionVariantTypes | undefined>(undefined);
  const [isPayment, setIsPayment] = React.useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (data?.data) {
      const hasPaymentDate = data.data.some((e) => e.dateOfPayment);

      setIsPayment(hasPaymentDate);
    }
  }, [data]);

  const handleOpenBusinessMenu = () => {
    setBusiness(true);
  };

  const handleSwitchPersonal = () => {
    setBusiness(false);
    setChoosePayment(undefined);
  };

  const handleSubmitPayment = async (paymentType: PaymentVariantTypes) => {
    if (!choosePayment) {
      console.error('Please, choose payment type before proceed.');

      return;
    }

    try {
      const response = await sendPayment({
        amount: 0,
        baseUrl: 'http://localhost:3000/profile/generalinfo',
        paymentType,
        typeSubscription: choosePayment
      });
      const url = response.data?.url || '';

      setSavePaymentUrl(url);
      if (savePaymentUrl) {
        await router.push(savePaymentUrl);
      }
    } catch (error) {
      console.error(`Transaction failed. Please, write to support. \n ${paymentType}: ${error}`);
    }
  };

  const handleSubmitPayPal = () => handleSubmitPayment(paymentVariants.paypal);
  const handleSubmitStripe = () => handleSubmitPayment(paymentVariants.stripe);

  return (
    <div className={s.wrapperPayment}>
      {!isPayment ? (
        <div className={s.box}>
          <Radio.Root className={s.radioRoot} name={'grade'}>
            <Radio.Item onClick={handleSwitchPersonal} value={'1 radio'}>
              Personal
            </Radio.Item>
            <Radio.Item onClick={handleOpenBusinessMenu} value={'2 radio'}>
              Business
            </Radio.Item>
          </Radio.Root>
        </div>
      ) : (
        <RenewalAndSubscriptionMenu />
      )}

      {business && (
        <>
          <Typography className={s.BusinessText} variant={'regular_text_16'}>
            Your subscription costs:
          </Typography>
          <div className={s.boxBusiness}>
            <Radio.Root className={s.radioRoot} name={'grade'}>
              <Radio.Item onClick={() => setChoosePayment(subscriptionVariants.day)} value={'1 radio'}>
                $10 per 1 day
              </Radio.Item>
              <Radio.Item onClick={() => setChoosePayment(subscriptionVariants.weekly)} value={'2 radio'}>
                $50 per 7 days
              </Radio.Item>
              <Radio.Item onClick={() => setChoosePayment(subscriptionVariants.monthly)} value={'3 radio'}>
                $100 per month
              </Radio.Item>
            </Radio.Root>
          </div>
          <div className={s.payIconBox}>
            <div className={clsx(s.paymentTypeBox, s.boxPaypal)} onClick={handleSubmitPayPal}>
              <PayPal />
            </div>
            <div>Or</div>
            <div className={clsx(s.paymentTypeBox, s.boxStripe)} onClick={handleSubmitStripe}>
              <Stripe />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
