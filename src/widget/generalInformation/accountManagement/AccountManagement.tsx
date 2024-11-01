import React, { useEffect, useState } from 'react';

import { useGetCurrentPaymentSubscriptionQuery, useSendPaymentMutation } from '@/shared/api/device/paymentApi';
import { ModalKey, useModal } from '@/shared/lib';
import { Radio, Typography } from '@/shared/ui';
import RenewalAndSubscriptionMenu from '@/widget/generalInformation/accountManagement/RenewalAndSubscriptionMenu';
import PayPal from '@/widget/generalInformation/accountManagement/icon/PayPal';
import Stripe from '@/widget/generalInformation/accountManagement/icon/Stripe';
import { PaymentModals } from '@/widget/modals/paymentModals/PaymentModals';
import { PaymentProceedModal } from '@/widget/modals/paymentProceedModal/PaymentProceedModal';
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

const chooseModalContentVariant = {
  buttonText: 'Back to payment',
  description: 'Please, choose payment type before proceed.',
  title: 'Choose subscription plan'
};

export type PaymentModalContentType = typeof errorPayModalContentVariant;

export const AccountManagement = () => {
  const { data } = useGetCurrentPaymentSubscriptionQuery();
  // const {data: submissionResponse} = useGetSubmissionResponse()
  const [sendPayment] = useSendPaymentMutation();
  const [business, setBusiness] = useState<boolean>(false);
  const [savePaymentUrl, setSavePaymentUrl] = useState<string | undefined>(undefined);
  const [choosePayment, setChoosePayment] = useState<SubscriptionVariantTypes | undefined>(undefined);
  const [isPayment, setIsPayment] = useState<boolean>(false);
  const { isOpen: isPaymentModalOpen, setOpen: setIsPaymentModalOpen } = useModal(ModalKey.PaymentModals);
  const { isOpen: isPaymentProceedOpen, setOpen: setIsPaymentProceedOpen } = useModal(ModalKey.PaymentProceed);
  const [proceedStatus, setProceedStatus] = useState<boolean>(false);
  const [paymentModalsContent, setPaymentModalsContent] = useState<PaymentModalContentType | undefined>(undefined);
  const router = useRouter();

  // useEffect(() => {
  //   if (submissionResponse) {
  //     setBusiness(submissionResponse === 'business');
  //   }
  // }, [submissionResponse]);

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

  const submitPayment = async (paymentType: PaymentVariantTypes) => {
    if (!choosePayment) {
      // console.error('Please, choose subscription variant before proceed.');
      setPaymentModalsContent(chooseModalContentVariant);
      setIsPaymentModalOpen(true);

      return;
    }

    // Открываем модалку для подтверждения платежа
    setIsPaymentProceedOpen(true);
    const proceed = await new Promise<boolean>((resolve) => {
      setProceedStatus((status) => {
        resolve(status);

        return status;
      });
    });

    // Если пользователь не подтвердил платеж, то выходим нахрен и не делаем запрос
    if (!proceed) {
      return;
    }

    try {
      setIsPaymentProceedOpen(true);
      if (!proceedStatus) {
        return;
      }
      const response = await sendPayment({
        amount: 0,
        // baseUrl: 'http://localhost:3000/profile/generalinfo',
        baseUrl: 'http://localhost:3000/profile/generalinfo',
        paymentType,
        typeSubscription: choosePayment
      });
      const url = response.data?.url || '';

      setSavePaymentUrl(url);
      if (savePaymentUrl) {
        setChoosePayment(undefined);
        await router.push(savePaymentUrl);
      }
    } catch (error) {
      setPaymentModalsContent(errorPayModalContentVariant);
      setIsPaymentModalOpen(true);
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

    subscriptionType && setChoosePayment(subscriptionType);
  };

  return (
    <>
      <PaymentModals
        content={paymentModalsContent}
        openModal={isPaymentModalOpen}
        setOpenModal={setIsPaymentModalOpen}
      />
      <PaymentProceedModal
        openModal={isPaymentProceedOpen}
        setOpenModal={setIsPaymentProceedOpen}
        setProceedStatus={setProceedStatus}
      />
      <div className={s.wrapperPayment}>
        {!isPayment ? (
          <div className={s.box}>
            <Radio.Root className={s.radioRoot} name={'grade'}>
              <Radio.Item checked={!business} onClick={handleSwitchPersonal} value={'1 radio'}>
                Personal
              </Radio.Item>
              <Radio.Item checked={business} onClick={handleOpenBusinessMenu} value={'2 radio'}>
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
                <Radio.Item data-sub={subscriptionVariants.day} onClick={handlePickSubscriptionType} value={'1 radio'}>
                  $10 per 1 day
                </Radio.Item>
                <Radio.Item
                  data-sub={subscriptionVariants.weekly}
                  onClick={handlePickSubscriptionType}
                  value={'2 radio'}
                >
                  $50 per 7 days
                </Radio.Item>
                <Radio.Item
                  data-sub={subscriptionVariants.monthly}
                  onClick={handlePickSubscriptionType}
                  value={'3 radio'}
                >
                  $100 per month
                </Radio.Item>
              </Radio.Root>
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
    </>
  );
};
