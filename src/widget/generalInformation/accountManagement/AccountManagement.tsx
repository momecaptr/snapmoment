import React, { useEffect, useState } from 'react';

import { useGetCurrentPaymentSubscriptionQuery, useSendPaymentMutation } from '@/shared/api/device/paymentApi';
import { ModalKey, useModal } from '@/shared/lib';
import { Card, Checkbox, Radio, Typography } from '@/shared/ui';
import PayPal from '@/widget/generalInformation/accountManagement/icon/PayPal';
import Stripe from '@/widget/generalInformation/accountManagement/icon/Stripe';
import { getNormalDateFormat } from '@/widget/generalInformation/lib/getNormalDateFormat';
import { PaymentModals } from '@/widget/modals/paymentModals/PaymentModals';
import { RenewalOffProceedModal } from '@/widget/modals/paymentProceedModal/RenewalOffProceedModal';
import { isAfter } from '@formkit/tempo';
import { clsx } from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

import s from './AccountManagement.module.scss';

const accountVariants = {
  business: 'Business',
  personal: 'Personal'
};

// export type ChooseAccountType = 'Business' | 'Personal';
export type AccountVariantTypes = (typeof accountVariants)[keyof typeof accountVariants];

export const paymentVariants = {
  paypal: 'PAYPAL',
  stripe: 'STRIPE'
};

// export type ChoosePaymentType = 'PAYPAL' | 'STRIPE';
export type PaymentVariantTypes = (typeof paymentVariants)[keyof typeof paymentVariants];

export const subscriptionVariants = {
  day: 'DAY',
  monthly: 'MONTHLY',
  weekly: 'WEEKLY'
};
// export type ChoosePaymentType = 'DAY' | 'MONTHLY' | 'WEEKLY';
export type SubscriptionVariantTypes = (typeof subscriptionVariants)[keyof typeof subscriptionVariants];

const subscriptionsTextOptions = {
  [subscriptionVariants.day]: `$10 per ${subscriptionVariants.day.toLowerCase()}`,
  [subscriptionVariants.monthly]: `$100 per ${subscriptionVariants.monthly.toLowerCase()}`,
  [subscriptionVariants.weekly]: `$50 per ${subscriptionVariants.weekly.toLowerCase()}`
};

const errorPayModalContentVariant = {
  buttonText: 'Back to payment',
  description: 'Transaction failed. Please, write to support.',
  title: 'Error'
};

const successPayModalContentVariant = {
  buttonText: 'OK',
  description: 'Payment was successful!',
  title: 'Success'
};

const notifyPayModalContentVariant = {
  buttonText: 'Back to payment',
  description: 'Please, choose payment type before proceed.',
  title: 'Choose subscription plan'
};

export type PaymentModalContentType = typeof errorPayModalContentVariant;

export const AccountManagement = () => {
  const { data } = useGetCurrentPaymentSubscriptionQuery();
  const [sendPayment] = useSendPaymentMutation();
  const [remoteAccountVariant, setRemoteAccountVariant] = useState<AccountVariantTypes | undefined>(undefined);
  const [localAccountVariant, setLocalAccountVariant] = useState<AccountVariantTypes | undefined>(undefined);
  const [isAutoRenewal, setIsAutoRenewal] = useState<boolean>();
  const [savedPaymentUrl, setSavedPaymentUrl] = useState<string | undefined>(undefined);
  const [savedPaymentSubscription, setSavedPaymentSubscription] = useState<SubscriptionVariantTypes | undefined>(
    undefined
  );
  const { isOpen: isPaymentModalsOpen, setOpen: setIsPaymentModalsOpen } = useModal(ModalKey.PaymentModals);
  const { isOpen: isProceedOpen, setOpen: setIsProceedOpen } = useModal(ModalKey.PaymentProceed);
  const [isProceedPayment, setIsProceedPayment] = useState<boolean>(false);
  const [paymentModalsContent, setPaymentModalsContent] = useState<PaymentModalContentType | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();

  // useEffect(() => {
  //   if (searchParams.has('success=true')) {
  //     setPaymentModalsContent(successPayModalContentVariant);
  //     setIsPaymentModalsOpen(true);
  //   }
  // }, []);

  useEffect(() => {
    if (data) {
      // Проверяем по последней оплате, активна ли подписка
      const isPaid = isAfter(new Date(data?.data[0]?.endDateOfSubscription), new Date());
      const isAutoRenewal = data?.hasAutoRenewal;

      isPaid && setRemoteAccountVariant(accountVariants.business);
      isAutoRenewal && setIsAutoRenewal(true);

      setLocalAccountVariant(accountVariants.business);
    }
  }, [data]);

  const handleOpenBusinessMenu = () => {
    setLocalAccountVariant(accountVariants.business);
  };

  const handleSwitchPersonal = () => {
    setLocalAccountVariant(accountVariants.personal);
    setSavedPaymentSubscription(undefined);
  };

  const submitPayment = async (paymentType: PaymentVariantTypes) => {
    if (!savedPaymentSubscription) {
      setPaymentModalsContent(notifyPayModalContentVariant);
      setIsPaymentModalsOpen(true);

      return;
    }

    try {
      const response = await sendPayment({
        amount: 0,
        baseUrl: 'http://localhost:3000/profile/generalinfo',
        paymentType,
        typeSubscription: savedPaymentSubscription
      });
      const url = response.data?.url || '';

      setSavedPaymentUrl(url);
      if (savedPaymentUrl) {
        setSavedPaymentSubscription(undefined);
        await router.push(savedPaymentUrl);
      }
    } catch (error) {
      setPaymentModalsContent(errorPayModalContentVariant);
      setIsPaymentModalsOpen(true);
    }
  };

  const handleSubmitPaymentType = (e: React.MouseEvent<HTMLDivElement>) => {
    const paymentType = e.currentTarget.dataset.payment as PaymentVariantTypes;

    if (paymentType) {
      void submitPayment(paymentType);
    }
  };

  const handlePickSubscriptionType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const subscriptionType = e.currentTarget.dataset.sub as SubscriptionVariantTypes;

    subscriptionType && setSavedPaymentSubscription(subscriptionType);
  };

  const handleAutoRenewal = async (value: boolean) => {
    // Открываем модалку для подтверждения платежа
    setIsProceedOpen(true);
    const proceed = await new Promise<boolean>((resolve) => {
      setIsProceedPayment((status) => {
        resolve(status);

        return status;
      });
    });

    // Если пользователь не подтвердил платеж, то выходим нахрен и не делаем запрос
    if (!proceed) {
      return;
    }
    setIsAutoRenewal(value);
  };

  const { formattedDate, formattedDateEnd } = getNormalDateFormat(
    data?.data[0] ?? { dateOfPayment: '', endDateOfSubscription: '' }
  );

  const isRemoteEqualsBusinessAccount = remoteAccountVariant === accountVariants.business;
  const isLocalEqualsBusinessAccount = localAccountVariant === accountVariants.business;

  return (
    <div className={s.container}>
      <PaymentModals
        content={paymentModalsContent}
        openModal={isPaymentModalsOpen}
        setOpenModal={setIsPaymentModalsOpen}
      />
      <RenewalOffProceedModal
        openModal={isProceedOpen}
        setOpenModal={setIsProceedOpen}
        setProceedStatus={setIsProceedPayment}
      />
      {isRemoteEqualsBusinessAccount && (
        <div className={s.block}>
          <Typography className={s.blockTitle} variant={'bold_text_16'}>
            {'Current Subscription:'}
          </Typography>
          <Card className={s.expirationArea}>
            <div>
              <Typography className={s.expirationAreaTitle} variant={'regular_text_14'}>
                {'Expire at'}
              </Typography>
              <Typography variant={'medium_text_14'}>{formattedDate}</Typography>
            </div>
            <div>
              <Typography className={s.expirationAreaTitle} variant={'regular_text_14'}>
                {'Next payment'}
              </Typography>
              <Typography variant={'medium_text_14'}>{formattedDateEnd}</Typography>
            </div>
          </Card>
        </div>
      )}
      {isLocalEqualsBusinessAccount && isRemoteEqualsBusinessAccount && (
        <div className={s.checkBoxWrapper}>
          <Checkbox checked={isAutoRenewal} onCheckedChange={handleAutoRenewal} />
          <Typography as={'span'} variant={'regular_text_14'}>
            {'Auto - Renewal'}
          </Typography>
        </div>
      )}
      <div className={s.block}>
        <Typography className={s.blockTitle} variant={'bold_text_16'}>
          {'Account type:'}
        </Typography>
        <Card className={s.cardBox}>
          <Radio.Root className={s.radioRoot}>
            <Radio.Item
              checked={!isRemoteEqualsBusinessAccount}
              disabled={isRemoteEqualsBusinessAccount}
              onClick={handleSwitchPersonal}
              value={accountVariants.personal}
            >
              <Typography variant={'regular_text_14'}>{accountVariants.personal}</Typography>
            </Radio.Item>
            <Radio.Item
              checked={isRemoteEqualsBusinessAccount}
              onClick={handleOpenBusinessMenu}
              value={accountVariants.business}
            >
              <Typography variant={'regular_text_14'}>{accountVariants.business}</Typography>
            </Radio.Item>
          </Radio.Root>
        </Card>
      </div>

      {isLocalEqualsBusinessAccount && (
        <>
          <div className={s.block}>
            <Typography className={s.blockTitle} variant={'bold_text_16'}>
              {isRemoteEqualsBusinessAccount ? 'Change your subscription' : 'Your subscription costs'}
            </Typography>
            <Card className={s.cardBox}>
              <Radio.Root className={s.radioRoot}>
                <Radio.Item
                  data-sub={subscriptionVariants.day}
                  onClick={handlePickSubscriptionType}
                  value={subscriptionVariants.day}
                >
                  <Typography variant={'regular_text_14'}>
                    {subscriptionsTextOptions[subscriptionVariants.day]}
                  </Typography>
                </Radio.Item>
                <Radio.Item
                  data-sub={subscriptionVariants.weekly}
                  onClick={handlePickSubscriptionType}
                  value={subscriptionVariants.weekly}
                >
                  <Typography variant={'regular_text_14'}>
                    {subscriptionsTextOptions[subscriptionVariants.weekly]}
                  </Typography>
                </Radio.Item>
                <Radio.Item
                  data-sub={subscriptionVariants.monthly}
                  onClick={handlePickSubscriptionType}
                  value={subscriptionVariants.monthly}
                >
                  <Typography variant={'regular_text_14'}>
                    {subscriptionsTextOptions[subscriptionVariants.monthly]}
                  </Typography>
                </Radio.Item>
              </Radio.Root>
            </Card>
          </div>
          <div className={s.payIconBox}>
            <div
              className={clsx(s.paymentTypeBox, s.boxPaypal)}
              data-payment={paymentVariants.paypal}
              onClick={handleSubmitPaymentType}
            >
              <PayPal />
            </div>
            <div>Or</div>
            <div
              className={clsx(s.paymentTypeBox, s.boxStripe)}
              data-payment={paymentVariants.stripe}
              onClick={handleSubmitPaymentType}
            >
              <Stripe />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
