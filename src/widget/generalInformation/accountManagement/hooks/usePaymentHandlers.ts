import React from 'react';

import { useCancelAutoRenewalMutation, useGetCurrentPaymentSubscriptionQuery } from '@/shared/api/device/paymentApi';
import {
  AccountVariantTypes,
  type PaymentVariantTypes,
  type SubscriptionVariantTypes,
  accountVariants
} from '@/shared/lib';

type Props = {
  setIsAutoRenewal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsProceedModalOpen: (value: boolean) => void;
  setLocalAccountVariant: React.Dispatch<React.SetStateAction<AccountVariantTypes | undefined>>;
  setSavedAutoRenewalValue: React.Dispatch<React.SetStateAction<boolean>>;
  setSavedPaymentSubscription: React.Dispatch<React.SetStateAction<SubscriptionVariantTypes | undefined>>;
  submitPayment: (paymentType: PaymentVariantTypes) => Promise<void>;
};

/**
 * Хук `usePaymentHandlers`
 *
 * @description
 * Содержит обработчики для управления подписками и платежами, включая выбор типа подписки,
 * переключение между бизнес- и персональным аккаунтом, управление автообновлением и
 * подтверждение действий в модальных окнах.
 *
 * * setIsAutoRenewal - Функция для обновления состояния автообновления.
 * * setIsProceedModalOpen - Функция для управления модальным окном подтверждения.
 * * setLocalAccountVariant - Функция для установки локального типа аккаунта.
 * * setSavedAutoRenewalValue - Функция для временного сохранения значения автообновления.
 * * setSavedPaymentSubscription - Функция для временного сохранения типа подписки.
 * * submitPayment - Функция для отправки платежа.
 *
 * @returns {Object} Объект с обработчиками.
 */

export const usePaymentHandlers = (props: Props) => {
  const {
    setIsAutoRenewal,
    setIsProceedModalOpen,
    setLocalAccountVariant,
    setSavedAutoRenewalValue,
    setSavedPaymentSubscription,
    submitPayment
  } = props;
  const { data, isLoading } = useGetCurrentPaymentSubscriptionQuery();
  const [cancelAutoRenewal, { isLoading: isCancelAutoRenewalLoading }] = useCancelAutoRenewalMutation();
  const handleOpenBusinessMenu = () => {
    setLocalAccountVariant(accountVariants.business);
  };

  const handleSwitchPersonal = () => {
    setLocalAccountVariant(accountVariants.personal);
    setSavedPaymentSubscription(undefined);
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
        .catch((error: any) => {
          console.error(error);
        });
      // setIsAutoRenewal(savedAutoRenewalValue);
    }
    setIsProceedModalOpen(false);
  };

  return {
    handleAutoRenewal,
    handleModalProceed,
    handleOpenBusinessMenu,
    handlePickSubscriptionType,
    handleSubmitPaymentType,
    handleSwitchToPersonal: handleSwitchPersonal
  };
};
