import React, { useEffect, useState } from 'react';

import {
  useCancelAutoRenewalMutation,
  useGetCurrentPaymentSubscriptionQuery,
  useSendPaymentMutation
} from '@/shared/api/device/paymentApi';
import { ModalKey, useModal } from '@/shared/lib';
import { Card, Checkbox, Loading, Radio, Typography } from '@/shared/ui';
import { getNormalDateFormat } from '@/widget/generalInformation/lib/getNormalDateFormat';
import { PaymentModals } from '@/widget/modals/paymentModals/PaymentModals';
import { RenewalOffProceedModal } from '@/widget/modals/paymentProceedModal/RenewalOffProceedModal';
import { isAfter } from '@formkit/tempo';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';

import s from './AccountManagement.module.scss';

import PayPal from '../../../../public/assets/components/PayPal';
import Stripe from '../../../../public/assets/components/Stripe';
import {
  accountVariants,
  errorPayModalContentVariant,
  notifyPayModalContentVariant,
  paymentVariants,
  subscriptionVariantsArray,
  subscriptionsTextOptions,
  successPayModalContentVariant
} from './lib/accountManagementConstants';
import {
  type AccountVariantTypes,
  type PaymentModalContentType,
  type PaymentVariantTypes,
  type SubscriptionVariantTypes
} from './lib/accountManagementConstantsTypes';

export const AccountManagement = () => {
  const { data, isLoading } = useGetCurrentPaymentSubscriptionQuery();
  const [sendPayment, { isLoading: isSendPaymentLoading }] = useSendPaymentMutation();
  const [cancelAutoRenewal, { isLoading: isCancelAutoRenewalLoading }] = useCancelAutoRenewalMutation();
  const [remoteAccountVariant, setRemoteAccountVariant] = useState<AccountVariantTypes | undefined>(undefined);
  const [localAccountVariant, setLocalAccountVariant] = useState<AccountVariantTypes | undefined>(undefined);
  const [isAutoRenewal, setIsAutoRenewal] = useState<boolean>(false);
  const [savedAutoRenewalValue, setSavedAutoRenewalValue] = useState<boolean>(isAutoRenewal);
  const [savedPaymentUrl, setSavedPaymentUrl] = useState<string | undefined>(undefined);
  const [savedPaymentSubscription, setSavedPaymentSubscription] = useState<SubscriptionVariantTypes | undefined>(
    undefined
  );
  const [paymentModalsContent, setPaymentModalsContent] = useState<PaymentModalContentType | undefined>(undefined);
  const { isOpen: isPaymentModalsOpen, setOpen: setIsPaymentModalsOpen } = useModal(ModalKey.PaymentModals);
  const { isOpen: isProceedModalOpen, setOpen: setIsProceedModalOpen } = useModal(ModalKey.PaymentProceed);
  const router = useRouter();

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

  useEffect(() => {
    if (router.query.success && !isPaymentModalsOpen) {
      // Предположим, что `success` — это параметр запроса, который вы проверяете
      setPaymentModalsContent(successPayModalContentVariant);
      setIsPaymentModalsOpen(true);
      void router.replace(router.pathname, undefined, { shallow: true }); // Используем shallow для предотвращения полного обновления
    }
  }, [router.query, isPaymentModalsOpen]);

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

  // Вот это вызываем когда нажимаем на чекбокс AutoRenewal - сохраняем значение на момент нажатия и открываем модалку
  const handleAutoRenewal = (value: boolean) => {
    // Если автообновление отключено, то ничего не делаем
    if (!data?.hasAutoRenewal) {
      return;
    }
    setSavedAutoRenewalValue(value);
    setIsProceedModalOpen(true);
  };

  // Вот это вызываем когда закрываем модалку
  const handleModalProceed = (value: boolean) => {
    // Только если value === true, то меняем isAutoRenewal чекбокс на тот, что сохранили и отправляем запрос
    if (value) {
      cancelAutoRenewal()
        .then(() => {
          // После успешного завершения запроса обновляем состояние
          setIsAutoRenewal(false);
        })
        .catch((error) => {
          console.error(error);
        });
      // setIsAutoRenewal(savedAutoRenewalValue);
    }
    setIsProceedModalOpen(false);
  };

  const { formattedDate, formattedDateEnd } = getNormalDateFormat(
    data?.data[0] ?? { dateOfPayment: '', endDateOfSubscription: '' }
  );

  const isRemoteEqualsBusinessAccount = remoteAccountVariant === accountVariants.business;
  const isLocalEqualsBusinessAccount = localAccountVariant === accountVariants.business;

  if (isLoading || isSendPaymentLoading || isCancelAutoRenewalLoading) {
    return <Loading />;
  }

  return (
    <div className={s.container}>
      <PaymentModals
        content={paymentModalsContent}
        openModal={isPaymentModalsOpen}
        setOpenModal={setIsPaymentModalsOpen}
      />
      <RenewalOffProceedModal
        onProceedStatusChange={handleModalProceed}
        openModal={isProceedModalOpen}
        setOpenModal={setIsProceedModalOpen}
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
          <Checkbox checked={isAutoRenewal} disabled={!data?.hasAutoRenewal} onCheckedChange={handleAutoRenewal} />
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
            <>
              <Typography className={s.blockTitle} variant={'bold_text_16'}>
                {isRemoteEqualsBusinessAccount ? 'Change your subscription' : 'Your subscription costs'}
              </Typography>
              <Card className={s.cardBox}>
                <Radio.Root className={s.radioRoot}>
                  {subscriptionVariantsArray.map((variant) => (
                    <Radio.Item data-sub={variant} key={variant} onClick={handlePickSubscriptionType} value={variant}>
                      <Typography variant={'regular_text_14'}>{subscriptionsTextOptions[variant]}</Typography>
                    </Radio.Item>
                  ))}
                </Radio.Root>
              </Card>
            </>
          </div>
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
        </>
      )}
    </div>
  );
};
