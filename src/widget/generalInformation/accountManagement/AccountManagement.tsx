import React, { useEffect, useState } from 'react';

import { AccountType, CurrentSubscriptionInfo } from '@/entities';
import { PaymentButtons, PickSubscriptionSection } from '@/features';
import {
  useCancelAutoRenewalMutation,
  useGetCurrentPaymentSubscriptionQuery,
  useSendPaymentMutation
} from '@/shared/api/device/paymentApi';
import {
  type AccountVariantTypes,
  ModalKey,
  type PaymentModalContentType,
  type PaymentVariantTypes,
  type SubscriptionVariantTypes,
  accountVariants,
  errorPayModalContentVariant,
  notifyPayModalContentVariant,
  successPayModalContentVariant,
  useModal
} from '@/shared/lib';
import { Checkbox, Loading, Typography } from '@/shared/ui';
import { PaymentModals } from '@/widget/modals/paymentModals/PaymentModals';
import { RenewalOffProceedModal } from '@/widget/modals/paymentProceedModal/RenewalOffProceedModal';
import { isAfter } from '@formkit/tempo';
import { useRouter } from 'next/router';

import s from './AccountManagement.module.scss';

import { usePaymentHandlers } from './hooks/usePaymentHandlers';

/**
 * Компонент `AccountManagement`
 *
 * @description
 * Компонент для управления учетной записью пользователя. Отображает текущую подписку, позволяет
 * включать и отключать автообновление подписки, а также выбирать и оформлять подписки.
 * Взаимодействует с API для получения текущей подписки, отправки платежа и отмены автообновления.
 *
 * @returns {JSX.Element} Интерфейс управления аккаунтом пользователя.
 */
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

  const {
    handleAutoRenewal,
    handleModalProceed,
    handleOpenBusinessMenu,
    handlePickSubscriptionType,
    handleSubmitPaymentType,
    handleSwitchToPersonal
  } = usePaymentHandlers({
    setIsAutoRenewal,
    setIsProceedModalOpen,
    setLocalAccountVariant,
    setSavedAutoRenewalValue,
    setSavedPaymentSubscription,
    submitPayment
  });

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
          <CurrentSubscriptionInfo
            classForCard={s.expirationArea}
            classForText={s.expirationAreaTitle}
            classForTitle={s.blockTitle}
          />
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
        <AccountType
          classForCard={s.cardBox}
          classForRadioRoot={s.radioRoot}
          classForTitle={s.blockTitle}
          handleOpenBusinessMenu={handleOpenBusinessMenu}
          handleSwitchPersonal={handleSwitchToPersonal}
          isRemoteEqualsBusinessAccount={isRemoteEqualsBusinessAccount}
        />
      </div>

      {isLocalEqualsBusinessAccount && (
        <>
          <div className={s.block}>
            <PickSubscriptionSection
              classForCard={s.cardBox}
              classForRadioRoot={s.radioRoot}
              classForTitle={s.blockTitle}
              handlePickSubscriptionType={handlePickSubscriptionType}
              isRemoteEqualsBusinessAccount={isRemoteEqualsBusinessAccount}
            />
          </div>
          <PaymentButtons handleSubmitPaymentType={handleSubmitPaymentType} />
        </>
      )}
    </div>
  );
};
