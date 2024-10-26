import React, { useEffect } from 'react';

import { useGetCurrentPaymentSubscriptionQuery, useSendPaymentMutation } from '@/shared/api/device/paymentApi';
import { Radio, Typography, Wrapper } from '@/shared/ui';
import RenewalAndSubscriptionMenu from '@/widget/generalInformation/accountManagement/RenewalAndSubscriptionMenu';
import PayPal from '@/widget/generalInformation/accountManagement/icon/PayPal';
import Stripe from '@/widget/generalInformation/accountManagement/icon/Stripe';
import { useRouter } from 'next/router';

import s from './AccountManagement.module.scss';

export type ChoosePaymentType = 'DAY' | 'MONTHLY' | 'WEEKLY';

export const AccountManagement: React.FC = () => {
  const { data } = useGetCurrentPaymentSubscriptionQuery();
  const [sendPayment] = useSendPaymentMutation();
  const [business, setBusiness] = React.useState<boolean>(false);
  const [savePaymentUrl, setSavePaymentUrl] = React.useState<string | undefined>(undefined);
  const [choosePayment, setChoosePayment] = React.useState<ChoosePaymentType | undefined>(undefined);
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

  const handleSubmitPayment = async (paymentType: 'PAYPAL' | 'STRIPE') => {
    if (!choosePayment) {
      console.error('Пожалуйста, выберите способ оплаты перед продолжением.');

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
      console.error(`Ошибка при отправке платежа ${paymentType}: ${error}`);
    }
  };

  const handleSubmitPayPal = () => handleSubmitPayment('PAYPAL');
  const handleSubmitStripe = () => handleSubmitPayment('STRIPE');

  return (
    <div className={s.wrapperPayment}>
      {!isPayment ? (
        <div className={s.box}>
          <Wrapper variant={'withoutStyles'}>
            <Radio.Root className={s.radioRoot} name={'grade'}>
              <Radio.Item onClick={handleSwitchPersonal} value={'1 radio'}>
                Личный
              </Radio.Item>
              <Radio.Item onClick={handleOpenBusinessMenu} value={'2 radio'}>
                Бизнес
              </Radio.Item>
            </Radio.Root>
          </Wrapper>
        </div>
      ) : (
        <RenewalAndSubscriptionMenu />
      )}

      {business && (
        <>
          <Typography className={s.BusinessText} variant={'regular_text_16'}>
            Стоимость вашей подписки
          </Typography>
          <div className={s.boxBusiness}>
            <Wrapper variant={'withoutStyles'}>
              <Radio.Root className={s.radioRootBusiness} name={'grade'}>
                <Radio.Item onClick={() => setChoosePayment('DAY')} value={'1 radio'}>
                  $10 за 1 день
                </Radio.Item>
                <Radio.Item onClick={() => setChoosePayment('WEEKLY')} value={'2 radio'}>
                  $50 за 7 дней
                </Radio.Item>
                <Radio.Item onClick={() => setChoosePayment('MONTHLY')} value={'3 radio'}>
                  $100 в месяц
                </Radio.Item>
              </Radio.Root>
            </Wrapper>
          </div>
        </>
      )}
      {business && (
        <div className={s.payIconBox}>
          <div className={s.boxPaypal} onClick={handleSubmitPayPal}>
            <PayPal />
          </div>
          <div>Or</div>
          <div className={s.boxStripe} onClick={handleSubmitStripe}>
            <Stripe />
          </div>
        </div>
      )}
    </div>
  );
};
