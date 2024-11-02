import React, { useEffect, useState } from 'react';

import { useGetCurrentPaymentSubscriptionQuery, useSendPaymentMutation } from '@/shared/api/device/paymentApi';
import { Checkbox, Radio, Typography, Wrapper } from '@/shared/ui';
import { SubscriptionVariantTypes } from '@/widget/generalInformation/accountManagement/AccountManagement';
import PayPal from '@/widget/generalInformation/accountManagement/icon/PayPal';
import Stripe from '@/widget/generalInformation/accountManagement/icon/Stripe';
import { getNormalDateFormat } from '@/widget/generalInformation/lib/getNormalDateFormat';
import { useRouter } from 'next/router';

import s from './RenewalAndSubscriptionMenu.module.scss';

const RenewalAndSubscriptionMenu = () => {
  const [sendPayment] = useSendPaymentMutation();
  const { data } = useGetCurrentPaymentSubscriptionQuery();
  const [choosePayment, setChoosePayment] = useState<SubscriptionVariantTypes | undefined>();
  const [savePaymentUrl, setSavePaymentUrl] = useState<string | undefined>(undefined);
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const handleOpenBusinessMenu = () => setIsBusiness(true);

  const handleSwitchPersonal = () => {
    setIsBusiness(false);
    setChoosePayment(undefined);
  };

  const handleSubmitPayment = async (paymentType: 'PAYPAL' | 'STRIPE') => {
    if (!choosePayment) {
      console.error('Please choose a payment option before proceeding.');

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
        router.push(savePaymentUrl);
      }
    } catch (error) {
      console.error(`Error sending payment ${paymentType}`, error);
    }
  };

  const handleSubmitPayPal = () => handleSubmitPayment('PAYPAL');
  const handleSubmitStripe = () => handleSubmitPayment('STRIPE');

  useEffect(() => {
    if (data?.data) {
      const subscription = data.data.find((e) => e.autoRenewal);

      setIsChecked(!!subscription);
    }
  }, [data]);

  return (
    <div>
      <Typography className={s.BusinessText} variant={'regular_text_16'}>
        Current Subscription:
      </Typography>
      <div className={s.box}>
        <Wrapper variant={'withoutStyles'}>
          {data?.data.map((e) => {
            const { formattedDate, formattedDateEnd } = getNormalDateFormat(e);

            return (
              <div className={s.subscriptionDatePaymentBox} key={e.subscriptionId}>
                <div>
                  <Typography>Expire at</Typography>
                  <Typography>{formattedDate}</Typography>
                </div>
                <div>
                  <Typography>Next payment</Typography>
                  <Typography>{formattedDateEnd}</Typography>
                </div>
              </div>
            );
          })}
        </Wrapper>
      </div>

      <Typography className={s.BusinessText} variant={'regular_text_16'}>
        Account type:
      </Typography>
      <div className={s.box}>
        <Wrapper variant={'withoutStyles'}>
          <Radio.Root className={s.radioRoot} name={'accountType'}>
            <Radio.Item onClick={handleSwitchPersonal} value={'personal'}>
              Personal
            </Radio.Item>
            <Radio.Item onClick={handleOpenBusinessMenu} value={'business'}>
              Business
            </Radio.Item>
          </Radio.Root>
        </Wrapper>
      </div>

      {isBusiness && (
        <>
          <div className={s.checkBoxWrapper}>
            <Checkbox checked={isChecked} onChange={(e) => setIsChecked((e.target as HTMLInputElement).checked)} />
            <span>Auto-Renewal</span>
          </div>

          <Typography className={s.BusinessText} variant={'regular_text_16'}>
            Change your subscription:
          </Typography>
          <div className={s.boxBusiness}>
            <Wrapper variant={'withoutStyles'}>
              <Radio.Root className={s.radioRootBusiness} name={'subscriptionOptions'}>
                <Radio.Item onClick={() => setChoosePayment('DAY')} value={'daily'}>
                  $10 per 1 Day
                </Radio.Item>
                <Radio.Item onClick={() => setChoosePayment('WEEKLY')} value={'weekly'}>
                  $50 per 7 Days
                </Radio.Item>
                <Radio.Item onClick={() => setChoosePayment('MONTHLY')} value={'monthly'}>
                  $100 per month
                </Radio.Item>
              </Radio.Root>
            </Wrapper>
          </div>

          <div className={s.payIconBox}>
            <div className={s.boxPaypal} onClick={handleSubmitPayPal}>
              <PayPal />
            </div>
            <div>or</div>
            <div className={s.boxStripe} onClick={handleSubmitStripe}>
              <Stripe />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RenewalAndSubscriptionMenu;
